const Entry = require('../models/entry');
const { SendData, ServerError, AlreadyExists } = require('../helpers/response');
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
