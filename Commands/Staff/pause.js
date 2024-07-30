const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pausa')
        .setDescription('Dai una pausa a uno staffer.')
        .addSubcommand(command =>
            command.setName('request')
                .setDescription('Richiedi una pausa.')
                .addStringOption(option =>
                    option.setName('data_richiesta')
                        .setDescription('Scrivi la data in cui richiedi la pausa (GG/MM/AAAA).')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('data_ritorno')
                        .setDescription('Scrivi la data in cui ritorni dalla pausa (GG/MM/AAAA).')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('motivazione')
                        .setDescription('Scrivi il motivo per cui sarai assente.')
                        .setRequired(true)
                )
        )
        .addSubcommand(command =>
            command.setName('accept')
                .setDescription('Assegna una pausa a uno staffer.')
                .addUserOption(option =>
                    option.setName('staffer')
                        .setDescription('Lo staffer a cui vuoi dare una pausa.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('data_richiesta')
                        .setDescription('Scrivi la data in cui è stata richiesta la pausa (GG/MM/AAAA).')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('data_ritorno')
                        .setDescription('Scrivi la data in cui ritorna dalla pausa (GG/MM/AAAA).')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName('ruolo')
                        .setDescription('Il ruolo dello staffer.')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('staffer_in_pausa')
                        .setDescription('Scrivi quanti staffer in pausa in quel ruolo ci sono in quel momento.')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('giorni_usati')
                        .setDescription('Scrivi quanti giorni ha usato.')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('giorni_aggiuntivi')
                        .setDescription('Scrivi quanti giorni aggiunti ha.')
                        .setRequired(true)
                )
        ),

    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();

        switch (sub) {

            case 'request':
                try {
                    const datarichiesta = interaction.options.getString("data_richiesta");
                    const dataritorno = interaction.options.getString("data_ritorno");
                    const motivo = interaction.options.getString('motivazione')
                    const channel = interaction.guild.channels.cache.get('1202944178053455933');
                    const userRoles = interaction.member.roles.cache;
                    const allowedRoles = [
                        '1133777271308697642',
                        '1143604206276726908',
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

                    const requestEmbed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                        .setDescription(`<@&1143622365448765551> ${interaction.user} ha chiesto una pausa. \n\n Per accettarla eseguite il comando /pausa accept e compilate i vari campi.`)
                        .setThumbnail(`${client.user.displayAvatarURL()}`)
                        .addFields(
                            {
                                name: 'Data richiesta pausa:',
                                value: `${datarichiesta}`,
                                inline: true
                            },
                            {
                                name: 'Data ritorno dalla pausa:',
                                value: `${dataritorno}`,
                                inline: true
                            },
                            {
                                name: 'Motivo:',
                                value: `${motivo}`,
                                inline: true
                            }
                        )
                        .setColor('#e1c4ff')
                        .setTimestamp()
                        .setFooter({ text: `${interaction.user.id}`, iconURL: `${interaction.guild.iconURL()}` })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`La tua richiesta è stata inoltrata correttamente all'High Staff del server`)
                                .setColor('#e1c4ff')
                        ]
                    })

                    await channel.send({ content: '<@&1143622365448765551>', embeds: [requestEmbed] })
                } catch (err) {
                    console.error(err)
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Errore durante l'esecuzione del comando.`)
                                .setColor('Red')
                        ]
                    })
                }
                break;

            case 'accept':
                try {
                    const staffer = interaction.options.getUser('staffer');
                    const stafferMember = interaction.guild.members.cache.get(staffer.id);
                    const channel = interaction.guild.channels.cache.get('1147987497792581713');
                    const datarichiesta = interaction.options.getString("data_richiesta");
                    const dataritorno = interaction.options.getString("data_ritorno");
                    const ruolo = interaction.options.getRole('ruolo');
                    const stafferinpausa = interaction.options.getInteger("staffer_in_pausa");
                    const giorniusati = interaction.options.getInteger("giorni_usati");
                    const giorniaggiuntivi = interaction.options.getInteger("giorni_aggiuntivi");
                    const userRoles = interaction.member.roles.cache;
                    const allowedRoleID = [
                        '1133777271308697642',
                        '1143604206276726908',
                    ]
                    const allowedRoles = [
                        '1143622365448765551',
                        '1143604206276726908',
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

                    const hasAllowedRole2 = stafferMember.roles.cache.some(role => allowedRoleID.includes(role.id));
                    if (!hasAllowedRole2) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("Puoi selezionare solo uno staffer con il ruolo specificato.")
                                    .setColor("Red")
                            ]
                        });
                    }

                    const acceptEmbed = new EmbedBuilder()
                        .setAuthor({ name: `${staffer.username}`, iconURL: `${staffer.displayAvatarURL()}` })
                        .setDescription(`<:PM_calendar:1240695460902211615> **${staffer}** è in pausa dal **${datarichiesta}** al **${dataritorno}**
                        \n <:PM_role:1240695640518950983> **Ruolo:** **${ruolo}**
                        \n <:PM_app:1240579272981348353> **Numero di staffer in pausa in quel ruolo:** **${stafferinpausa}**
                        \n <:PM_clessidra:1240695134782361661> **Giorni usati in totale:** **${giorniusati}/60** 
                        \n <:PM_tempo:1240694496421744791> **Giorni aggiuntivi:** **${giorniaggiuntivi}**`)
                        .setColor('#e1c4ff')
                        .setTimestamp()
                        .setThumbnail(`${client.user.displayAvatarURL()}`)
                        .setFooter({ text: `Pausa accettata da ${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}` })

                    channel.send({ content: `${staffer}`, embeds: [acceptEmbed] })
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Azione eseguita con successo da ${interaction.user.username}.`)
                                .setColor('#e1c4ff')
                        ]
                    }
                    )
                } catch (error) {
                    console.error(error);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Errore durante l'esecuzione del comando.`)
                                .setColor('Red')
                        ]
                    })
                }
        }
    }
}