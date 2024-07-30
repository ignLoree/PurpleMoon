const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,

  async execute(message) {
    if (message.channel.id !== '1142078901892427836') return;

    if (message.author.bot) return;
    if (message.content === ("Notte") || message.content === "notte" || message.content === ("Buonanotte") || message.content === ("buonanotte") || message.content === "gn" || message.content === "Gn") {
      try {
        await message.react('<:PM_pepesleep:1209436785248174132>');
        await message.react('<a:PM_pepe_sleep:1209436788435718204>');
        await message.react('<a:PM_pepeSalute:1209436793263489075>');
      } catch (error) {
        console.error(error)
        return
      }
    }
    if (message.content === ("Giorno") || message.content === ("giorno") || message.content === ("buongiorno") || message.content === ("Buongiorno") || message.content === ("bg") || message.content === ("Bg") || message.content === ("gm") || message.content === ("Gm")) {
      try {
        await message.react('<:PM_PepeCoffee:1209433852838154333>');
        await message.react('<:PM_pepecryCoffee:1209433849449283594>');
        await message.react('<:PM_pepecomfyblush:1209433846261616660>');
      } catch (error) {
        console.error(error)
        return
      }
    }
    if (message.content === "welcome" || message.content === "Welcome" || message.content === "wlc" || message.content === "Wlc") {
      try {
        await message.react('<:PM_love_mew:1218225771290820660>');
        await message.react('<a:PM_pika_wave:1241301630490513409>');
        await message.react('<:PM_gengar_cool:1241304496919810109>');
      } catch (error) {
        console.error(error)
        return
      }
    }
  },
};