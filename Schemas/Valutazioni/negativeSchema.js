const { model, Schema } = require('mongoose');

let negativeschema = new Schema({
    negativecount: Number,
    staffer: String,
    reason: String,
})

module.exports = model('negativeschema', negativeschema);