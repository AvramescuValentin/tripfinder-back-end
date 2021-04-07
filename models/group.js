const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String},
    location: {type: String, required: true},
    tags: [String],
    creator: {type: String, required: true},
    members:[String]

})

module.exports = mongoose.model('Group', groupSchema);
