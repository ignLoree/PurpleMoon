const { Schema, model } = require('mongoose');

let valutazione = new Schema({
    ChannelID: String,
    GuildID: String,
});

module.exports = model('valutazione', valutazione);