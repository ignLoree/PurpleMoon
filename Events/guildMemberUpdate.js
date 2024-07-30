const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember, client) {
        try {
            const boostAnnounceChannel = client.channels.cache.get(config.boostChannelId);
            const boostAnnounceLogChannel = client.channels.cache.get(config.boostLogChannelId);

            const format = {
                0: "Nessun Livello",
                1: "Livello 1",
                2: "Livello 2",
                3: "Livello 3",
            };

            const secondBoostRoleId = '1213972926144053369';

            const boostLevel = format[newMember.guild.premiumTier];

            if (
                !oldMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole.id) &&
                newMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole.id)
            ) {
                const boostAnnounceEmbed = new EmbedBuilder()
                    .setAuthor({ name: `${newMember.user.username}`, iconURL: `${newMember.user.displayAvatarURL()}` })
                    .setDescription(
                        `**<a:PM_Boost:1148010086061576202> __NUOVO BOOST__** \n\n **Grazie** ${newMember.user} per aver boostato il server! \n\n <a:PM_diamond:1148914201453142076> Apri un <#1027909064421806100> per riscattare i tuoi <#1143527534315708516>!`
                    )
                    .setColor("#e1c4ff")
                    .setFooter({
                        text: `Ora siamo a ${newMember.guild.premiumSubscriptionCount} boost!`,
                        iconURL: `${newMember.guild.iconURL()}`
                    })
                    .setTimestamp()
                    .setThumbnail(client.user.displayAvatarURL());

                await boostAnnounceChannel.send({
                    content: `<:PM_evee_thank:1241304501466435615> ${newMember.user}`,
                    embeds: [boostAnnounceEmbed],
                });

                const boostLogEmbed = new EmbedBuilder()
                    .setAuthor({
                        name: `Nuovo Boost!`,
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .addFields(
                        {
                            name: "💎 Nitro Booster",
                            value: `${newMember.user} | ${newMember.user.tag}`,
                        },
                        {
                            name: "🎉 Server boostato il:",
                            value: `<t:${Math.round(newMember.premiumSinceTimestamp / 1000)}:f> | <t:${Math.round(newMember.premiumSinceTimestamp / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: "⏰ Account creato il:",
                            value: `<t:${Math.round(newMember.user.createdTimestamp / 1000)}:f> | <t:${Math.round(newMember.user.createdTimestamp / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: "📆 Entratə nel server il:",
                            value: `<t:${Math.round(newMember.joinedTimestamp / 1000)}:f> | <t:${Math.round(newMember.joinedTimestamp / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: "💜 Boost Totali:",
                            value: `${newMember.guild.premiumSubscriptionCount} Boost | ${boostLevel}`,
                            inline: false,
                        },
                        {
                            name: "✅ Ruoli Assegnati:",
                            value: `${newMember.guild.roles.premiumSubscriberRole} | ${newMember.guild.roles.premiumSubscriberRole.name} | ${newMember.guild.roles.premiumSubscriberRole.id}`,
                            inline: false,
                        }
                    )
                    .setThumbnail(newMember.user.displayAvatarURL({ size: 1024 }))
                    .setColor("#e1c4ff")
                    .setFooter({
                        text: `ID: ${newMember.user.id}`,
                        iconURL: newMember.guild.iconURL({ size: 1024 }),
                    })
                    .setTimestamp();

                await boostAnnounceLogChannel.send({
                    embeds: [boostLogEmbed],
                });

                if (newMember.guild.premiumSubscriptionCount === 2) {
                    await newMember.roles.add(secondBoostRoleId);
                    console.log(`Assegnato il ruolo aggiuntivo al membro ${newMember.user.tag}`);
                }
            }

            if (
                oldMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole.id) &&
                !newMember.roles.cache.has(newMember.guild.roles.premiumSubscriberRole.id)
            ) {
                const unboostEmbedLog = new EmbedBuilder()
                    .setAuthor({
                        name: `Boost Sparito!`,
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .addFields(
                        {
                            name: "📌 UnBooster:",
                            value: `${oldMember.user} | ${oldMember.user.tag}`,
                        },
                        {
                            name: "⏰ Account creato il:",
                            value: `<t:${Math.round(oldMember.user.createdTimestamp / 1000)}:f> | <t:${Math.round(oldMember.user.createdTimestamp / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: "📆 Entratə nel server il:",
                            value: `<t:${Math.round(oldMember.joinedTimestamp / 1000)}:f> | <t:${Math.round(oldMember.joinedTimestamp / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: "💜 Boost Totali:",
                            value: `${oldMember.guild.premiumSubscriptionCount} Boost | ${boostLevel}`,
                            inline: false,
                        },
                        {
                            name: "❌ Ruoli Rimossi:",
                            value: `${oldMember.guild.roles.premiumSubscriberRole} | ${oldMember.guild.roles.premiumSubscriberRole.name} | ${oldMember.guild.roles.premiumSubscriberRole.id}`,
                            inline: false,
                        }
                    )
                    .setThumbnail(oldMember.user.displayAvatarURL({ size: 1024 }))
                    .setColor("#e1c4ff")
                    .setFooter({
                        text: `ID: ${oldMember.user.id}`,
                        iconURL: oldMember.guild.iconURL({ size: 1024 }),
                    })
                    .setTimestamp();

                await boostAnnounceLogChannel.send({
                    embeds: [unboostEmbedLog],
                });

                if (oldMember.guild.premiumSubscriptionCount === 1) {
                    await oldMember.roles.remove(secondBoostRoleId);
                    console.log(`Rimosso il ruolo aggiuntivo dal membro ${oldMember.user.tag}`);
                }
            }
        } catch (error) {
            console.error("Errore durante l'aggiornamento del membro:", error);
        }
    }
};