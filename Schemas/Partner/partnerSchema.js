const { model, Schema } = require('mongoose');

let partnerschema = new Schema({
    count: Number,
    author: String,
})

module.exports = model('partnerschema', partnerschema);