const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modname')
        .setDescription('Modera il nome di un utente')
        .addUserOption((option =>
            option.setName('user')
                .setDescription('L\'utente di cui moderare il nome')
                .setRequired(true)
        ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Non puoi fare questo comando!`)
                        .setColor("Red")
                ]
            });

            const user = interaction.options.getUser('user');
            const members = await interaction.guild.members.fetch(user.id).catch(err => { });
            const tagline = Math.floor(Math.random() * 1000) + 1;

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`🛠️ Nickaname di ${user.username} cambiato in Moderated Nickname ${tagline}`);

            await members.setNickname(`Moderated Nickname ${tagline}`);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error)
            return await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`⚠️ Non posso cambiare il nick di questa persona!`)
                        .setColor("Red")
                ]
            });
        }
    }
}