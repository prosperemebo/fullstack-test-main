const mongoose = require('mongoose');
const Category = require('../models/category');
const getter = require('../helpers/getter');

const { SendData, ServerError, AlreadyExists, NotFound, Unauthorized } = require('../helpers/response');

module.exports.get = async (req, res, next) => {
  try {
    const query = {};

    const data = await getter(Category, query, req, res);

    return next(SendData(data));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.create = async (req, { locals: { user } }, next) => {
  try {
    const data = new Category({ ...req.body, user: user.id });

    await data.save();

    return next(SendData(data.response('category')));
  } catch (err) {
    if (err.code === 11000) return next(AlreadyExists());
    return next(ServerError(err));
  }
};

module.exports.getById = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const category = await Category.findOne({ _id: id });

    if (category === null) return next(NotFound());

    if (category.user?.toString() !== user.id) return next(Unauthorized());

    return next(SendData(category.response('category')));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.getCategoryEntries = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const category = await Category.findOne({ _id: id }).populate('entries');

    if (category === null) return next(NotFound());

    if (category.user?.toString() !== user.id) return next(Unauthorized());

    return next(SendData(category.response('category')));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.getCategoryStats = async (req, { locals: { user } }, next) => {
  try {
    const categories = await Category.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user.id)
        }
      },
      {
        $lookup: {
          from: 'entries',
          localField: '_id',
          foreignField: 'category',
          as: 'entries'
        }
      },
      {
        $unwind: {
          path: '$entries',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $or: [{ entries: { $ne: null } }, { entries: { $exists: false } }]
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          budget: { $first: '$budget' },
          count: { $sum: { $cond: [{ $ifNull: ['$entries', false] }, 1, 0] } },
          totalEntryAmount: { $sum: { $ifNull: ['$entries.amount', 0] } }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          budget: 1,
          count: 1,
          balance: { $subtract: ['$budget', '$totalEntryAmount'] }
        }
      },
      {
        $sort: {
          balance: 1
        }
      }
    ]);

    return next(SendData(categories));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.update = async ({ params: { id }, body }, { locals: { user } }, next) => {
  try {
    const category = await Category.findOne({ _id: id });

    if (category === null) return next(NotFound());

    if (category.user?.toString() !== user.id) return next(Unauthorized());

    const data = Object.assign(category, body);

    await data.save();

    return next(SendData(category.response('category')));
  } catch (err) {
    if (err.code === 11000) return next(AlreadyExists());
    return next(ServerError(err));
  }
};

module.exports.delete = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const category = await Category.findOne({ _id: id });

    if (category === null) return next(NotFound());

    if (category.user?.toString() !== user.id) return next(Unauthorized());

    await category.deleteOne();

    return next(SendData({ message: 'Category deleted successfully' }));
  } catch (err) {
    return next(ServerError(err));
  }
};
