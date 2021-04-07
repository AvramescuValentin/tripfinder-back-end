const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type:String, required:true, minlength: 6},
    image:{type:String},
    groups: [String],
    gender: {type:String, required:true},
    country: {type:String, required:true},
    dateOfBirth:{type:Date, required:true},
    tags:[String],
    rating:Number,
    review:[{star:Number, commentary:String}]

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);