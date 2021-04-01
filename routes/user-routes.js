const express = require("express");

const userControllers = require('../controllers/user-controller');

const router = express.Router();

router.get('/', userControllers.getUser);

router.post('/signup', userControllers.signup);

router.post('/login', userControllers.login);


module.exports = router;