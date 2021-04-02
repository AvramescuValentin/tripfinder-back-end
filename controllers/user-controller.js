const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: "u1",
        lastName: "Avramescu",
        firstName: "Robert",
        email: "ar@gmail.com",
        phone: "+40 712 123 123",
        rating: "4.9",
        reviews: [{
            stars: "5",
            commentary: "very cool guy"
        },
            {
                stars: "4.8",
                commentary: "he snores"
            }],
        password:"passs",
        tags:[{
            tag: "tracking"
        },
            {tag: "camping"}]
    },

    {
        id: "u2",
        lastName: "Claudia",
        firstName: "Ciolan",
        email: "cc@gmail.com",
        phone: "+40 712 123 123",
        rating: "4.9",
        reviews: [{
            stars: "5",
            commentary: "very cool guy"
        },
            {
                stars: "4.8",
                commentary: "he snores"
            }],
        password:"passs",
        tags:[{
            tag: "tracking"
        },
            {tag: "camping"}]
    }

]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};


const signup = (req, res, next) => {
    const {email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);

    if(hasUser){
        throw new HttpError('Could not create user. Email already taken', 422);
    }

    const createdUser = {
        id: "123",
        email: email,
        password: password
    };
    DUMMY_USERS.push(createdUser);

    res.status(201).json(createdUser);
};

const login = (req, res, next) => {
    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user. Wrong credential!', 401);
    }

    res.json({message: 'Logged in!'});
};

exports.getUser = getUsers;
exports.signup = signup;
exports.login = login;