const express = require('express');
const controller = require('../controllers/entries');

const { isAuth } = require('../middlewares/isAuth');
const { validator } = require('../middlewares/validator');

const router = express.Router();

router.route('/').get(isAuth, controller.get).post(validator('createEntry'), isAuth, controller.create);

router.route('/stats').get(isAuth, controller.getStats);

router
  .route('/:id')
  .get(isAuth, controller.getById)
  .patch(validator('updateEntry'), isAuth, controller.update)
  .delete(isAuth, controller.delete);

module.exports = router;
