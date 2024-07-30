const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Ottieni un immagine random di un gatto carino."),
  async execute(interaction) {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      const imageUrl = response.data[0].url;

      const embed = new EmbedBuilder()
      .setImage(imageUrl)
      .setColor('#e1c4ff')
      .setTitle('😺 Meow')

      await interaction.reply({ embeds: [embed] });
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