const { model, Schema } = require('mongoose');

let welcomeSchema = new Schema({
    ChannelID: String,
    GuildID: String,
});

module.exports = model('welcomeSchema', welcomeSchema)