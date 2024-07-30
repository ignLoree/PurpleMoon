const { EmbedBuilder } = require('discord.js');
const PartnershipCount = require('../Schemas/Partner/partnerSchema')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.channel.id !== '1205827428140720128') return;

        if (message.author.bot) return;

        if (!message.member.roles.cache.some(role => role.id === '1143604206276726908')) return

        if (message.content.includes("discord.gg") || message.content.includes("discord.com/invite")) {
            const inviteCode = message.content.match(/discord(\.gg|\.com\/invite)\/([^/\s]+)/);

            try {
                if (inviteCode) {
                    let inviteLink = `https://discord${inviteCode[1]}/${inviteCode[2]}`;
                    const author = message.author.id;

                    let partnershipCount = await PartnershipCount.findOne({ author });
                    if (!partnershipCount) {
                        partnershipCount = new PartnershipCount({ author, count: 0 });
                    }

                    client.fetchInvite(inviteLink)
                        .then(invite => {
                            const serverName = invite.guild.name || "Unknown Server";
                            const serverIcon = invite.guild.iconURL();

                            if (inviteCode && inviteCode[2] && inviteCode[2].toLowerCase().includes("purplemoon")) {

                                const embed = new EmbedBuilder()
                                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                                    .setTitle(`**Partnership con ${serverName} da ${message.author.username}**`)
                                    .setDescription(`⚠️ Non puoi fare partner con il tuo server`)
                                    .setFooter({ text: `${serverName}`, iconURL: `${serverIcon}` })
                                    .setColor('Red')
                                    .setTimestamp()
                                    .setThumbnail(`${message.guild.iconURL()}`)

                                message.reply({ embeds: [embed] });
                            } else {
                                partnershipCount.count++;
                                partnershipCount.save();

                                const embed = new EmbedBuilder()
                                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                                    .setTitle(`**<a:PM_Partner:1147914265366372543> __PARTNERSHIP ESEGUITA__**`)
                                    .setDescription(`<a:PM_StarPink:1157726975750840320>・Grazie per aver _effettuato_ una **partner** con \`🌙 PurpleMoon\`
                            <a:PM_StarPurple:1159597596130684948>・Ora sei a **\`${partnershipCount.count}\`** partner!
                            <a:PM_StarBlue:1157727107963703327>・Partner Settimanali: **\`${partnershipCount.count}\`**`)
                                    .setFooter({ text: `Partner effettuata con ${serverName}`, iconURL: `${serverIcon}` })
                                    .setColor('#e1c4ff')
                                    .setTimestamp()
                                    .setThumbnail(`${message.guild.iconURL()}`)

                                message.reply({ embeds: [embed] });
                            }
                        })

                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}