const { SlashCommandBuilder } = require('discord.js');
const { ApexChat } = require('apexify.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chat')
    .setDescription('Genera una risposta da un\'AI')
    .addStringOption(option => option.setName('prompt').setDescription('Scrivi qualcosa per iniziare a parlare con il bot.').setRequired(true))
    .addStringOption(option => option.setName('modello').setDescription('Modello da usare.')
    .addChoices(
            {name: "v3-32k", value: "v3-32k"},
            {name: "turbo", value: "turbo"},
            {name: "apexChat", value: "apexChat"},
            {name: "starChat", value: "starChat"},
            {name: "check docs", value: "check docs"}).setRequired(false)),

    async execute(interaction) {

    await interaction.deferReply()
    const modal = interaction.options.getString('modello') || "turbo";
    const prompt = interaction.options.getString('prompt');

        try {
            const response = await ApexChat(modal, prompt);

            await interaction.editReply({ content: `${response}` });
        } catch (error) {
        console.error(error);
        await interaction.editReply({ content: `\`\`Errore durante l'esecuzione del comando.\`\``, ephemeral: true });
        }
    },
};