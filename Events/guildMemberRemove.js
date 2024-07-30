const { EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        try {
            if (member.guild === null) return;

            const totalvoicechannel1 = member.guild.channels.cache.find(channel => channel.id === '1213099775419883560');
            if (!totalvoicechannel1 || totalvoicechannel1 === null) return;
            const totalmembers1 = `${member.guild.memberCount}`;

            totalvoicechannel1.setName(`🌙・user: ${totalmembers1}`);

            const logChannel = member.guild.channels.cache.find(channel => channel.id === '1211621641159708672');
            if (!logChannel) {
                console.error('Canale log non trovato.');
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setAuthor({ name: `Utente Uscito`, iconURL: member.user.displayAvatarURL() })
                .setDescription(`${member} ${member.user.tag}\n \u200b`)
                .setFooter({ text: `ID: ${member.id}` })
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp()

            logChannel.send({ embeds: [embed] }).catch(console.error);
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        try {
            const logChannel = member.guild.channels.cache.find(channel => channel.id === '1143521364448399430');
            if (!logChannel) {
                console.error('Canale log non trovato.');
                return;
            }
            const fetchedLogs = await member.guild.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.MemberKick
            });

            const kickLog = fetchedLogs.entries.first();
            if (!kickLog || kickLog.target.id !== member.id) return;

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setAuthor({ name: 'Utente Kickato', iconURL: member.user.displayAvatarURL() })
                .setDescription(`${member.user} ${member.user.tag}\n \u200b`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({ text: `ID: ${member.user.id}` })
                .setTimestamp()

            await logChannel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
};