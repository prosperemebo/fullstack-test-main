const express = require('express');
const controller = require('../controllers/entries');

const { isAuth } = require('../middlewares/isAuth');
const { validator } = require('../middlewares/validator');

const router = express.Router();

router.route('/').get(isAuth, controller.get).post(validator('createEntry'), isAuth, controller.create);

module.exports = router;
