const { model, Schema } = require('mongoose');

let positiveschema = new Schema({
    positivecount: Number,
    staffer: String,
    reason: String,
})

module.exports = model('positiveschema', positiveschema);