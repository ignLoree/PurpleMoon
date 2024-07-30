const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const dadJokes = require("../../dadjokes.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Ottieni una freddura random."),

  async execute(interaction) {
    try {
      const randomIndex = Math.floor(Math.random() * dadJokes.dadJokes.length);
      const randomJoke = dadJokes.dadJokes[randomIndex].joke;

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(randomJoke)
            .setColor('#e1c4ff')
        ]
      });
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription("Errore durante l'esecuzione del comando.")
            .setColor('Red')
        ]
      });
    }
  },
};