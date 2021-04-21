const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Tags = require('../models/tags');
const Gender = require('../models/gender');

const getUsers = async (req, res, next) => {
    let name = req.params.name;
    let users;
    try {
        users = await User.find({fullName: name}, 'fullName image country rating');
    } catch (err) {
        const error = new HttpError('Something went worg. Please come again later', 500);
        return next(error);
    }
    res.json({users: users});
    console.log(users);
};

const getUserById = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, 'email username');
    } catch (err) {
        const error = new HttpError('Something went worg. Please come again later', 500);
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({getters: true}))});

};


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(err);
    }

    const {firstName, lastName, username, email, password, gender, location, dateOfBirth, tags, image} = req.body;
    let existingUser;
    console.log(gender);
    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError('Sign up failed. Please try again later.', 500);
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError('This Email is already in use. Please log in instead.', 422);
        return next(error);
    }
    ;

    try{
        
    }catch (err){}

    const createdUser = new User({
        firstName,
        lastName,
        username,
        email,
        password,
        gender,
        image,
        location,
        dateOfBirth,
        tags
    });
    try {
        await createdUser.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Creating a new user failed. Please try again later', 500);
        return next(error);
    }
    res.status(201).json({user: createdUser.toObject({getters: true})});
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        const error = new HttpError('Signing in failed. Please try again later', 500);
        return next(error);
    }
    if (!existingUser || existingUser.password !== password) {
        const error = HttpError('Invalid credentials.', 401);
        return next(error);
    }

    res.json({message: 'Logged in!'});
};

exports.getUser = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;