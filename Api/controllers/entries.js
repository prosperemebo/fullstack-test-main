const Entry = require('../models/entry');
const { SendData, ServerError, AlreadyExists, NotFound, Unauthorized } = require('../helpers/response');
const getter = require('../helpers/getter');

module.exports.get = async (req, res, next) => {
  try {
    const query = { user: res.locals?.user?.id };

    const data = await getter(Entry, query, req, res);

    return next(SendData(data));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.create = async (req, { locals: { user } }, next) => {
  try {
    const data = new Entry({ ...req.body, user: user.id });

    await data.save();

    return next(SendData(data.response('entry')));
  } catch (err) {
    if (err.code === 11000) return next(AlreadyExists());
    return next(ServerError(err));
  }
};

module.exports.getById = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const entry = await Entry.findOne({ _id: id });

    if (entry === null) return next(NotFound());

    if (entry.user?.toString() !== user.id) return next(Unauthorized());

    return next(SendData(entry.response('entry')));
  } catch (err) {
    return next(ServerError(err));
  }
};

module.exports.update = async ({ params: { id }, body }, { locals: { user } }, next) => {
  try {
    const entry = await Entry.findOne({ _id: id });

    if (entry === null) return next(NotFound());

    if (entry.user?.toString() !== user.id) return next(Unauthorized());

    const data = Object.assign(entry, body);

    await data.save();

    return next(SendData(entry.response('entry')));
  } catch (err) {
    if (err.code === 11000) return next(AlreadyExists());
    return next(ServerError(err));
  }
};

module.exports.delete = async ({ params: { id } }, { locals: { user } }, next) => {
  try {
    const entry = await Entry.findOne({ _id: id });

    if (entry === null) return next(NotFound());

    if (entry.user?.toString() !== user.id) return next(Unauthorized());

    await entry.deleteOne();

    return next(SendData({ message: 'Entry deleted successfully' }));
  } catch (err) {
    return next(ServerError(err));
  }
};
