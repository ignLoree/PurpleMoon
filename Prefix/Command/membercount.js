const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'membercount',

    async execute(message) {
        const guild = message.guild;
        const totalMembers = guild.memberCount;

        const embed = new EmbedBuilder()
            .setColor('#e1c4ff')
            .addFields(
                {
                    name: `**Members**`,
                    value: `${totalMembers}`
                }
            )
            .setTimestamp()

        await message.reply({ embeds: [embed] });
    }
}