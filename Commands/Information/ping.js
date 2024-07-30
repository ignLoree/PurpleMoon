const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ping = require('../../Schemas/Ping/pingSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra il ping del bot.'),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            const ws = interaction.client.ws.ping;
            const msgEdit = Date.now() - interaction.createdTimestamp;
            const uptime = process.uptime();
            const uptimeString = formatUptime(uptime);

            const getDatabasePing = async () => {
                const Now = Date.now();
                await ping.find().then()
                return ~~(Date.now() - Now);
            };

            const databasePing = await getDatabasePing();

            const pingEmbed = new EmbedBuilder()
                .setColor("#e1c4ff")
                .setDescription(`<:PM_green:1240597491603345428> La latenza del bot è **\`${ws}ms\`**.\n\n<:PM_uptime:1240597021560279041> **Uptime:** \`${uptimeString}\` ㅤㅤㅤ <:PM_api:1240596863674224670> **API:** \`${msgEdit}ms\`\n <:PM_database:1240596905487241287> **Database:** \`${databasePing}ms\`ㅤㅤㅤㅤ <:PM_shard:1240596977901899837> **Shard:** \`1\``)
            await interaction.editReply({ embeds: [pingEmbed] });
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

function formatUptime(uptime) {
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m`;
}