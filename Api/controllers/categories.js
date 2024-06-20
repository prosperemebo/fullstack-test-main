const Category = require('../models/category');
const getter = require('../helpers/getter');

const { SendData, ServerError, AlreadyExists } = require('../helpers/response');

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
