const express = require('express');
const controller = require('../controllers/categories');

const { isAuth } = require('../middlewares/isAuth');
const { validator } = require('../middlewares/validator');

const router = express.Router();

router.route('/').get(isAuth, controller.get).post(validator('createCategory'), isAuth, controller.create);

router.route('/stats').get(isAuth, controller.getCategoryStats);

router
  .route('/:id')
  .get(isAuth, controller.getById)
  .patch(validator('updateCategory'), isAuth, controller.update)
  .delete(isAuth, controller.delete);

router.route('/:id/entries').get(isAuth, controller.getCategoryEntries);

module.exports = router;
