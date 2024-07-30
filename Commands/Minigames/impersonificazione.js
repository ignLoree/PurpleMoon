const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const filter = require('../../jsons/filter.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("impersonate")
    .setDescription("Impersonificati in qualcuno.")
    .setDefaultMemberPermissions(PermissionFlagsBits.createWebhook)
    .addUserOption(option => option.setName("user").setDescription("L'utente di cui ti vuoi impersonificare").setRequired(true))
    .addStringOption(option => option.setName("message").setDescription("Che messaggio vuoi scrivere?").setRequired(true)),

    async execute(interaction, client) {

        const { options } = interaction;

        const member = options.getUser("user");
        const message = options.getString("message");

        if (filter.words.includes(message)) return interaction.reply({ content: `${client.config.filterMessage}`, ephemeral: true});

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.createWebhook)) return await interaction.reply({
            content: `${client.config.noPerms}`
        })

        if (message.includes('@everyone') || message.includes('@here')) return await interaction.reply({ 
            content: `**Non puoi** menzionare \`\`everyone/here\`\` con questo comando`, 
            ephemeral: true
        });
        
        interaction.channel.createWebhook({ name: member.username, avatar: member.displayAvatarURL({ dynamic: true })}).then((webhook) => {
        
            webhook.send({ content: message });
            setTimeout(() => {
                webhook.delete();
            }, 3000);
        });
        
        interaction.reply({ content: `${member || "user"} has been **successfully** impersonated <#${interaction.channel.id}>!`, ephemeral: true });
    },
};