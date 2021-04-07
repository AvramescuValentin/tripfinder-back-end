const express = require("express");
const {check} = require('express-validator');

const userControllers = require('../controllers/user-controller');

const router = express.Router();

router.get('/', [
        check('email').not().isEmpty(),
        check('password').isLength({min: 5}),
        check('username').notEmpty()
    ],
    userControllers.getUser);

router.post('/signup', userControllers.signup);

router.post('/login', userControllers.login);


module.exports = router;