const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const staff = require('../../Schemas/Staff/staffSchema');
const positive = require('../../Schemas/Valutazioni/positiveSchema')
const negative = require('../../Schemas/Valutazioni/negativeSchema')
const partner = require('../../Schemas/Partner/partnerSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Gestisci lo staff di PurpleMoon')
        .addSubcommand(command =>
            command.setName('pex')
                .setDescription(`Pexa un utente.`)
                .addUserOption(option =>
                    option.setName('user').setDescription('Specifica l\'utente da pexare.').setRequired(true))
                .addRoleOption(option =>
                    option.setName('vecchioruolo').setDescription('Specifica il ruolo precedente.').setRequired(true))
                .addRoleOption(option =>
                    option.setName('ruolo').setDescription('Specifca il ruolo da dare.').setRequired(true))
                .addStringOption(option =>
                    option.setName('motivo').setDescription('Specifica il motivo del pex.').setRequired(true))
        )
        .addSubcommand(command =>
            command.setName('depex')
                .setDescription(`Depexa uno staffer.`)
                .addUserOption(option =>
                    option.setName('staffer').setDescription('Specifica l\'utente da depexare.').setRequired(true))
                .addRoleOption(option =>
                    option.setName('ruolo').setDescription('Specifica il ruolo da togliere.').setRequired(true))
                .addRoleOption(option =>
                    option.setName('nuovoruolo').setDescription('Specifica il ruolo da dare.').setRequired(true))
                .addStringOption(option =>
                    option.setName('motivo').setDescription('Specifica il motivo del depex.').setRequired(true))
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();
        const Data = await staff.findOne({ GuildID: interaction.guild.id });
        const userRoles = interaction.member.roles.cache;
        const allowedRoles = [
            '1143622365448765551'
        ];

        const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role.id));
        if (!hasAllowedRole && !interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Non hai il permesso per fare questo comando!')
                        .setColor("Red")
                ]
            });
        }

        switch (sub) {

            case 'pex':
                try {
                    const pchannel = Data.ChannelID;
                    const pexdepexchannel = interaction.guild.channels.cache.get(pchannel);

                    let utentee = interaction.options.getUser('user');
                    let reason = interaction.options.getString('motivo');
                    let member = interaction.guild.members.cache.get(utentee.id);
                    let oldrole = interaction.options.getRole('ruolo');
                    let role = interaction.options.getRole('vecchioruolo')
                    const channel = interaction.guild.channels.cache.get('1192542139826053323');
                    const pmchannel = interaction.guild.channels.cache.get('1192542416163569794');

                    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Non hai i permessi per fare questo comando!')
                                    .setColor("Red")
                            ]
                        })
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

                    member.roles.add(oldrole.id);

                    if (oldrole.id === '1143604206276726908') {
                        member.roles.add('1143604206276726908');

                        await pmchannel.send({content: `
                            ${utentee}
# Benvenutə nei Partner Manager <a:PM_Butterfly:1159597588912296029>
                            
> **Per iniziare al meglio** controlla: <:PM_green:1240597491603345428>
<:PM_White_Dot:1147944922159272088> <#1202757031145111653>
                            
__Per qualsiasi cosa l'High Staff è disponibile__ <a:PM_GoldenCrown:1219795702121631754>`})
                    }
                    if (oldrole.id === '1143622574463520910') {
                        member.roles.add('1133777271308697642');

                        await channel.send({content: `
                            ${utentee}
# Benvenutə nello staff <a:PM_Butterfly:1159597588912296029>
                            
> **Per iniziare al meglio** controlla: <:PM_green:1240597491603345428>
<:PM_White_Dot:1147944922159272088> <#1147987276840833115>
<:PM_White_Dot:1147944922159272088> <#1203472074136358973>
<:PM_White_Dot:1147944922159272088> <#1147988143035908136>
                            
__Per qualsiasi cosa l'High Staff è disponibile__ <a:PM_GoldenCrown:1219795702121631754>`})
                    }

                    if (oldrole.id === '1143622597498634251') {
                        member.roles.remove('1143622574463520910');
                    }

                    if (oldrole.id === '972616873021689916') {
                        member.roles.remove('1143622597498634251');
                    }

                    if (oldrole.id === '1197954938702139484') {
                        member.roles.remove('972616873021689916');
                    }

                    if (oldrole.id === '1143622619866861579') {
                        member.roles.remove('1197954938702139484');
                        member.roles.add('1143622365448765551');
                    }

                    if (oldrole.id === '1143622636220448940') {
                        member.roles.remove('1143622619866861579');
                    }

                    if (oldrole.id === '1203324551128416318') {
                        member.roles.remove('1203321216962662480');
                    }

                    if (oldrole.id === '1240699532988121110') {
                        member.roles.remove('1143622636220448940');
                    }

                    const embed = new EmbedBuilder()
                        .setDescription(`Pex da **${interaction.user.username}**`)
                        .setThumbnail(client.user.displayAvatarURL())
                        .addFields(
                            {
                                name: "<a:PM_punto:1159603819752194099> User:",
                                value: `${utentee}`
                            },
                            {
                                name: "<a:PM_purple_flames:1159603888815624192> Ruolo:",
                                value: `${role} <a:PM_Arrow:1240704950103969927> ${oldrole}`
                            },
                            {
                                name: "<a:PM_purplebutterfly:1159597588912296029> Motivo:",
                                value: `${reason}`
                            }
                        )
                        .setColor('#e1c4ff')
                        .setTimestamp()

                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Azione eseguita con successo da ${interaction.user.username}.`)
                                .setColor('#e1c4ff')
                        ]
                    });

                    const msg = await pexdepexchannel.send({ content: `${utentee}`, embeds: [embed] });
                    msg.createMessageComponentCollector();

                    await staff.create({
                        GuildID: interaction.guild.id,
                        ChannelID: pexdepexchannel.id,
                        Msg: msg.id,
                        AuthorID: interaction.user.id,
                    });
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
                break;

            case 'depex':

                try {

                    const pchannel = Data.ChannelID;
                    const pexdepexchannel = interaction.guild.channels.cache.get(pchannel);
                    let utentee = interaction.options.getUser('staffer');
                    let role = interaction.options.getRole('ruolo');
                    let reason = interaction.options.getString('motivo');
                    let member = interaction.guild.members.cache.get(utentee.id);
                    let newrole = interaction.options.getRole('nuovoruolo')
                    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Non hai i permessi per fare questo comando!')
                                    .setColor("Red")
                            ]
                        })
                    }

                    if (!member.roles.cache.has(role.id)) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`L'utente ${utentee} non ha il ruolo che gli vuoi togliere.`)
                                    .setColor("Red")
                            ]
                        })
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

                    if (role.id === '1143604206276726908') {
                        member.roles.remove(role.id);

                        await partner.deleteMany({
                            author: utentee.id,
                        })
                    }

                    if (role.id === '1143622574463520910') {
                        member.roles.remove(role.id);
                        member.roles.remove('1133777271308697642');
                        member.roles.remove('1226186274088554670');
                    }
                    if (role.id === '1143622597498634251') {
                        member.roles.remove(role.id);
                        member.roles.remove('1133777271308697642');
                        member.roles.remove('1226186274088554670');
                    }
                    if (role.id === '972616873021689916') {
                        member.roles.remove(role.id);
                        member.roles.remove('1133777271308697642');
                        member.roles.remove('1226186328790798337');
                    }
                    if (role.id === '1197954938702139484') {
                        member.roles.remove(role.id);
                        member.roles.remove('1133777271308697642');
                        member.roles.remove('1226186328790798337');
                    }
                    if (role.id === '1143622619866861579') {
                        member.roles.remove(role.id);
                        member.roles.remove('1133777271308697642');
                        member.roles.remove('1143622365448765551');
                    }
                    if (role.id === '1143622636220448940') {
                        member.roles.remove(role.id);
                        member.roles.remove('1133777271308697642');
                        member.roles.remove('1143622365448765551');
                    }
                    if (role.id === '1203321216962662480') {
                        member.roles.remove(role.id);
                    }
                    if (role.id === '1203324551128416318') {
                        member.roles.remove(role.id);
                    }


                    await positive.deleteMany({
                        staffer: utentee.id,
                    })
                    await negative.deleteMany({
                        staffer: utentee.id,
                    })

                    const depexembed = new EmbedBuilder()
                        .setDescription(`Depex da **${interaction.user.username}**`)
                        .setThumbnail(client.user.displayAvatarURL())
                        .addFields(
                            {
                                name: "<a:PM_punto:1159603819752194099> Staffer:",
                                value: `${utentee}`
                            },
                            {
                                name: "<a:PM_purple_flames:1159603888815624192> Ruolo:",
                                value: `${role} <a:PM_Arrow:1240704950103969927> ${newrole}`
                            },
                            {
                                name: "<a:PM_purplebutterfly:1159597588912296029> Motivo:",
                                value: `${reason}`
                            }
                        )
                        .setColor('#e1c4ff')
                        .setTimestamp()

                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Azione eseguita con successo da ${interaction.user.username}.`)
                                .setColor('#e1c4ff')
                        ],
                    });
                    const msg = await pexdepexchannel.send({ content: `${utentee}`, embeds: [depexembed] });
                    msg.createMessageComponentCollector();

                    await staff.create({
                        GuildID: interaction.guild.id,
                        ChannelID: pexdepexchannel.id,
                        Msg: msg.id,
                        AuthorID: interaction.user.id,
                    });
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
}