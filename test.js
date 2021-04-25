require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Gender = require('./models/gender');
const Location = require('./models/location');
const User = require('./models/user');
const Tag = require('./models/tags');

const HttpError = require('./models/http-error');
const groupRoutes = require('./routes/group-routes');
const userRoutes = require('./routes/user-routes')


mongoose
    .connect(process.env.DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { // daca am reusit sa ne connectam la baza de date pornim si serverul
        console.log("Server is listening on port 5000!");
    })
    .catch(err => {
        console.log(err); //altfel vom returna o eroare
    });

const tag = new Tag({
    value:"cityBreak"
});

tag.save();