const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const LastFmUser = require('../../Schemas/LastFm/LastFmUser')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('import')
        .setDescription('Imposta il tuo username di Last.fm')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Il tuo username di Last.fm')
                .setRequired(true)),

    async execute(interaction) {
        const lastFmUsername = interaction.options.getString('username');
        const discordId = interaction.user.id;

        await LastFmUser.findOneAndUpdate({ discordId }, { lastFmUsername }, { upsert: true });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setDescription('Il tuo username di Last.fm è stato inserito nel mio database!')
            ], ephemeral: true
        });
    }
};


