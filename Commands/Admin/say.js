const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Hace que nunu hable por vos')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('mensaje').setDescription('el mensaje que queres que diga el bot').setRequired(true)),
    async execute(interaction) {
        
            const mensaje = interaction.options.getString('mensaje');

            const channel = interaction.channel;
            
            interaction.reply({ content: `mensaje enviado`, ephemeral: true });
            channel.send({ content: `${mensaje}`})
        },
};