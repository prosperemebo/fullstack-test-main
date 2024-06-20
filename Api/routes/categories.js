const express = require('express');
const controller = require('../controllers/categories');

const { isAuth } = require('../middlewares/isAuth');
const { validator } = require('../middlewares/validator');

const router = express.Router();

router.route('/').get(isAuth, controller.get).post(validator('createCategory'), isAuth, controller.create);

module.exports = router;
