const { Schema, model } = require('mongoose');

let staff = new Schema({
    ChannelID: String,
    GuildID: String,
    AuthorID: String,
    Msg: String,
});

module.exports = model('staff', staff);