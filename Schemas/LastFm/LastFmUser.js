const { model, Schema } = require('mongoose');

let lastFmUserSchema = new Schema({
  discordId: { type: String, required: true, unique: true },
  lastFmUsername: { type: String, required: true },
});

module.exports = model('LastFmUser', lastFmUserSchema);