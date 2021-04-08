const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String},
    location: {type: String, required: true},
    tags: [String],
    tripDate: {type:Date, required:true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    members:[{type: mongoose.Types.ObjectId, ref: 'User'}]

})

module.exports = mongoose.model('Group', groupSchema);
