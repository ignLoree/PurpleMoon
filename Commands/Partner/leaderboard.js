const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const PartnershipCount = require('../../Schemas/Partner/partnerSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Show partnership leaderboard')
        .addSubcommand(subcommand =>
            subcommand
                .setName("alltime")
                .setDescription('Show all-time partnership leaderboard')
                .addNumberOption(num =>
                    num
                        .setName("page")
                        .setRequired(false)
                        .setDescription("The page on the leaderboard you would like to view.")
                )
        ),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand()
        const userRoles = interaction.member.roles.cache;
        const allowedRoles = [
            '1143622365448765551'
        ];

        const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role.id));
        if (!hasAllowedRole) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Non hai il permesso per fare questo comando!')
                        .setColor('Red')
                ]
            });
        }

        switch (sub) {

            case 'alltime':
                try {
                    const page = interaction.options.getNumber("page");

                    const userData = await PartnershipCount.find().sort({ count: -1 });

                    const embed = new EmbedBuilder()
                        .setTitle('🏆 Partner Leaderboard')
                        .setColor('#2f3136')
                        .setTimestamp();

                    if (page) {
                        const pageNum = 10 * page - 10;
                        if (userData.length < pageNum) {
                            return await interaction.reply({ content: `❌ Impossibile trovare la pagina N°**${page}**.` });
                        }
                        if (userData.length >= 11) {
                            embed.setFooter({
                                text: `Pagina ${page} di ${Math.ceil(userData.length / 10)}`,
                            });
                        }

                        for (const user of userData.splice(pageNum, 10)) {
                            const index = userData.findIndex((b) => b.id == user.id);
                            if (!/^\d{17,19}$/.test(user.id)) {
                                console.error(`Invalid ID format: ${user.id}`);
                                continue;
                            }
                            const guildMember = await interaction.guild.members.fetch(user.id).catch(() => null);
                            const userTag = guildMember ? guildMember.user.tag : 'Unknown User';

                            embed.addFields({
                                name: `${index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`} ${userTag}`,
                                value: `> Partner fatte: ${user.count}`
                            });
                        }

                        return await interaction.reply({ embeds: [embed] });
                    }

                    if (userData.length >= 11) {
                        embed.setFooter({
                            text: `Pagina 1 di ${Math.ceil(userData.length / 10)}`,
                        });
                    }

                    for (const user of userData.slice(0, 10)) {
                        const index = userData.findIndex((b) => b.id == user.id);
                        if (!/^\d{17,19}$/.test(user.id)) {
                            console.error(`Invalid ID format: ${ user.id }`);
                            continue;
                        }
                        const guildMember = await interaction.guild.members.fetch(user.id).catch(() => null);
                        const userTag = guildMember ? guildMember.user.tag : 'Unknown User';

                        embed.addFields({
                            name: `${index + 1 === 1 ? '🥇' : `${index + 1 === 2 ? '🥈' : `${index + 1 === 3 ? '🥉' : `#${index + 1}`}`}`} ${userTag}`,
                            value: `> Partner fatte: ${user.count}`
                        });
                    }
                    return await interaction.reply({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Errore durante l'esecuzione del comando.")
                                .setColor('Red')
                        ]
                    });
                }
        }
    }
};