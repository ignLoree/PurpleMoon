const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const valutazione = require('../../Schemas/Valutazioni/valSchema');
const positive = require('../../Schemas/Valutazioni/positiveSchema')
const negative = require('../../Schemas/Valutazioni/negativeSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("valutazione")
        .setDescription("Dai una valutazione a uno staffer")
        .addSubcommand(sub =>
            sub.setName('positiva')
                .setDescription('Dai una valutazione positiva a uno staffer.')
                .addUserOption(option =>
                    option.setName('staffer')
                        .setDescription('Lo staffer a cui dare la valutazione positiva.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName("motivo")
                        .setDescription("Motivazione della valutazione.")
                        .setRequired(true))
        )
        .addSubcommand(sub =>
            sub.setName('negativa')
                .setDescription('Dai una valutazione negativa a uno staffer.')
                .addUserOption(option =>
                    option.setName('staffer')
                        .setDescription('Lo staffer a cui dare la valutazione negativa.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName("motivo")
                        .setDescription("Motivazione della valutazione.")
                        .setRequired(true))
        )
        .addSubcommand(sub =>
            sub.setName('media')
                .setDescription('Vedi le valutazioni di uno staffer.')
                .addUserOption(option =>
                    option.setName('staffer')
                        .setDescription('Lo staffer di cui vuoi vedere le valutazioni.')
                        .setRequired(true))
        ),  

    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();
        const valdata = await valutazione.findOne({ GuildID: interaction.guild.id });
        const utentee = interaction.options.getUser('staffer');
        const reason = interaction.options.getString("motivo");
        const channel = interaction.guild.channels.cache.get(valdata.ChannelID);
        const staffer = utentee.id;
        let positiveCount = await positive.findOne({ staffer });
        let negativeCount = await negative.findOne({ staffer });

        switch (sub) {
            case 'positiva':
                try {
                    const stafferMember = interaction.guild.members.cache.get(utentee.id);
                    const userRoles = interaction.member.roles.cache;
                    const allowedRoleID = '1133777271308697642';
                    const allowedRoles = [
                        '972616873021689916',
                        '1197954938702139484',
                        '1143622365448765551'
                    ];

                    const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role.id));
                    if (!hasAllowedRole && !interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Non hai il permesso per fare questo comando!')
                                    .setColor("Red")]
                        });
                    }
                    if (!stafferMember.roles.cache.has(allowedRoleID)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("Puoi selezionare solo uno staffer con il ruolo specificato.")
                                    .setColor("Red")
                            ]
                        });
                    }

                    if (interaction.user.id === utentee.id) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Non puoi usare questo comando su te stesso!')
                                    .setColor("Red")
                            ]
                        })
                    }

                    if (!positiveCount) {
                        positiveCount = new positive({ staffer, positivecount: 0 });
                    }

                    positiveCount.positivecount++
                    positiveCount.reason = reason
                    positiveCount.save()

                    const positiva = new EmbedBuilder()
                        .setAuthor({ name: `${utentee.username}`, iconURL: `${utentee.displayAvatarURL()}` })
                        .setTitle('<:PM_green:1240597491603345428> **__Valutazione Positiva__**')
                        .setThumbnail(`${client.user.displayAvatarURL()}`)
                        .addFields(
                            {
                                name: '<a:PM_punto:1159603819752194099> Staffer:',
                                value: `${utentee}`
                            },
                            {
                                name: '<a:PM_Staff:1240605781091680268> **Motivazione:**',
                                value: `${reason}`
                            },
                            {
                                name: '<:PM_app:1240579272981348353> Valutazioni __positive__ ',
                                value: `${positiveCount.positivecount}`
                            }
                        )
                        .setColor('#e1c4ff')
                        .setFooter({ text: `Valutazione ricevuta da ${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}` })
                        .setTimestamp()

                    channel.send({ content: `${utentee}`, embeds: [positiva] })
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Azione eseguita con successo da ${interaction.user.username}.`)
                                .setColor('#e1c4ff')
                        ],
                    });
                } catch (error) {
                    console.error(error);
                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Errore durante l'esecuzione del comando.")
                                .setColor('Red')
                        ]
                    });
                };
                break;

            case 'negativa':
                try {
                    const stafferMember = interaction.guild.members.cache.get(utentee.id);
                    const userRoles = interaction.member.roles.cache;
                    const allowedRoleID = '1133777271308697642';
                    const allowedRoles = [
                        '972616873021689916',
                        '1197954938702139484',
                        '1143622365448765551'
                    ];

                    const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role.id));
                    if (!hasAllowedRole && !interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Non hai il permesso per fare questo comando!')
                                    .setColor("Red")]
                        });
                    }
                    if (!stafferMember.roles.cache.has(allowedRoleID)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("Puoi selezionare solo uno staffer con il ruolo specificato.")
                                    .setColor("Red")
                            ]
                        });
                    }

                    if (interaction.user.id === utentee.id) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Non puoi usare questo comando su te stesso!')
                                    .setColor("Red")
                            ]
                        })
                    }

                    if (!negativeCount) {
                        negativeCount = new negative({ staffer, negativecount: 0 });
                    }

                    negativeCount.negativecount++
                    negativeCount.reason = reason
                    negativeCount.save()

                    const negativa = new EmbedBuilder()
                        .setAuthor({ name: `${utentee.username}`, iconURL: `${utentee.displayAvatarURL()}` })
                        .setDescription('<:PM_Red:1240688779354837112> **__Valutazione Negativa__**')
                        .setThumbnail(`${client.user.displayAvatarURL()}`)
                        .addFields(
                            {
                                name: '<a:PM_punto:1159603819752194099> Staffer:',
                                value: `${utentee}`
                            },
                            {
                                name: '<a:PM_Staff:1240605781091680268> **Motivazione:**',
                                value: `${reason}`
                            },
                            {
                                name: '<:PM_app:1240579272981348353> Valutazioni __negative__ ',
                                value: `${negativeCount.negativecount}`
                            }
                        )
                        .setColor('#e1c4ff')
                        .setFooter({ text: `Valutazione ricevuta da ${interaction.user.username}` })
                        .setTimestamp()

                    channel.send({ content: `${utentee}`, embeds: [negativa] })
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Azione eseguita con successo da ${interaction.user.username}.`)
                                .setColor('#e1c4ff')
                        ],
                    });
                } catch (error) {
                    console.error(error);
                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Errore durante l'esecuzione del comando.")
                                .setColor('Red')
                        ]
                    });
                };
                break;

            case 'media':
                try {
                    if (!positiveCount) {
                        positiveCount = new positive({ staffer, positivecount: 0 });
                    }
                    if (!negativeCount) {
                        negativeCount = new negative({ staffer, negativecount: 0 });
                    }

                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${utentee.username}`, iconURL: `${utentee.displayAvatarURL()}` })
                        .setColor('#e1c4ff')
                        .addFields({
                            name: 'Valutazioni positive',
                            value: `${positiveCount.positivecount}`
                        },
                            {
                                name: 'Valutazioni negative',
                                value: `${negativeCount.negativecount}`
                            }
                        )
                        .setThumbnail(`${client.user.displayAvatarURL()}`)
                        .setFooter({ text: `Queste sono le valutazioni di ${utentee.username}`, iconURL: `${interaction.guild.iconURL()}` })

                    await interaction.reply({ embeds: [embed], ephemeral: true })
                } catch (error) {
                    console.error(error);
                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Errore durante l'esecuzione del comando.")
                                .setColor('Red')
                        ]
                    });
                };
                break;
        }
    }
}