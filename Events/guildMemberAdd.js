const { EmbedBuilder } = require('discord.js');
const welcomeSchema = require('../Schemas/Welcome/welcomeSchema');
const moment = require('moment')

async function formatUnix(unix) {
    const timestampMoment = moment.unix(unix);

    const duration = moment.duration(timestampMoment.diff(moment()));

    const years = Math.abs(duration.years());
    const months = Math.abs(duration.months());
    const weeks = Math.abs(duration.weeks());
    const days = Math.abs(duration.days());
    const hours = Math.abs(duration.hours());
    const minutes = Math.abs(duration.minutes());
    const seconds = Math.abs(duration.seconds());

    if (years > 0) {
        return `${years} anni, ${months} mesi`
    } else if (months > 0) {
        return `${months} mesi, ${weeks} settimane`
    } else if (weeks > 0) {
        return `${weeks} settimane, ${days} giorni`
    } else if (days > 0) {
        return `${days} giorni, ${hours} ore`
    } else if (hours > 0) {
        return `${hours} ore, ${minutes} minuti`
    } else if (minutes > 0) {
        return `${minutes} minuti, ${seconds} secondi `
    } else {
        return `${seconds} secondi`
    }
}

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        try {
            const logChannel = member.guild.channels.cache.find(channel => channel.id === '1211621641159708672');
            if (!logChannel) {
                console.error('Canale log non trovato.');
                return;
            }
            const welcomedata = await welcomeSchema.findOne({ GuildID: member.guild.id });

            if (!welcomedata) {
                console.log(`No welcome data found for guild: ${member.guild.id}`);
                return;
            }
            const channelwelcome = member.guild.channels.cache.get(welcomedata.ChannelID);
            if (!channelwelcome) {
                console.log(`Welcome channel not found for guild: ${member.guild.id}`);
                return;
            }

            if (member.guild === null) return;

            const totalvoicechannel = member.guild.channels.cache.find(channel => channel.id === '1213099775419883560');
            if (!totalvoicechannel || totalvoicechannel === null) return;
            const totalmembers = `${member.guild.memberCount}`;

            totalvoicechannel.setName(`🌙・user: ${totalmembers}`);

            const memberThumbnail = member.user.displayAvatarURL({ size: 256 });

            const userEmbed = new EmbedBuilder()
                .setAuthor({ name: `${member.user.username}` })
                .setTitle(`<a:PM_Fiocco:1159603737409617951> **Welcome to __PurpleMoon__**`)
                .setDescription(`<:PM_White_Dot:1147944922159272088> **Dai un'occhiata a questi canali.**\n\n <a:PM_Festa:1159603524116676648> <#1208406600629362690>\n <a:PM_Punto:1159603819752194099> <#1027909059082473482>\n <a:PM_Clouds:1159597587154870463> <#1141795044198723679>`)
                .setThumbnail(memberThumbnail)
                .setTimestamp()
                .setColor('#e1c4ff')
                .setFooter({ text: `Ora siamo in ${member.guild.memberCount}` });

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setAuthor({ name: `Utente Entrato`, iconURL: member.user.displayAvatarURL() })
                .setDescription(`${member} ${member.user.tag}`)
                .addFields(
                    { name: `Eta' Account`, value: `${await formatUnix(member.user.createdAt / 1000)}` }
                )
                .setFooter({ text: `ID: ${member.id}` })
                .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
                .setTimestamp()

            await channelwelcome.send({ content: `<a:PM_pika_wave:1241301630490513409> ${member.user}`, embeds: [userEmbed] });
            logChannel.send({ embeds: [embed] }).catch(console.error);
        } catch (error) {
            console.error(`Error in welcome event for member: ${member.user.tag} (${member.id}) in guild: ${member.guild.name} (${member.guild.id}) -`, error);
        }
    }
};