const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resoconti')
        .setDescription('Invia un resoconto di uno staffer')
        .addSubcommand(command =>
            command.setName('staff')
                .setDescription(`Invia un resoconto di uno staffer.`)
                .addUserOption(option =>
                    option.setName('staffer')
                        .setDescription('Seleziona lo staffer di cui fare il resoconto.')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('ruolo')
                        .setDescription('Seleziona il ruolo dello staffer.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('azione')
                        .setDescription('Seleziona l\'azione da applicare allo staffer.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Pex', value: 'Pex' },
                            { name: 'Depex', value: 'Depex' },
                            { name: 'Valutazione Negativa', value: 'Valutazione Negativa' },
                            { name: 'Valutazione Positiva', value: 'Valutazione Positiva' },
                            { name: 'Nulla', value: 'Nulla' },
                            { name: 'Nulla (è stato pexato da poco)', value: 'Nulla (è stato pexato da poco)' }
                        ))
                .addStringOption(option =>
                    option.setName('messaggi')
                        .setDescription('Messaggi inviati in una settimana.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('ore_in_voc')
                        .setDescription('Ore trascorse in vocale in una settimana.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('valutazioni_positive')
                        .setDescription('Valutazioni positive ricevute in una settimana.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('valutazioni_negative')
                        .setDescription('Valutazioni negative ricevute in una settimana.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('comportamento')
                        .setDescription('Seleziona il comportamento avuto durante la settimana.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Male', value: 'Male' },
                            { name: 'Decente', value: 'Decente' },
                            { name: 'Discreto', value: 'Discreto' },
                            { name: 'Bene', value: 'Bene' },
                            { name: 'Benissimo', value: 'Benissimo' },
                            { name: 'Perfetto', value: 'Perfetto' },
                        )
                )
        )
        .addSubcommand(command =>
            command.setName('partnermanager')
                .setDescription('Invia il resoconti di un Partner Manager')
                .addUserOption(option =>
                    option.setName('staffer')
                        .setDescription('Seleziona lo staffer di cui fare il resoconto.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('partner')
                        .setDescription('Partner fatte in una settimana.')
                        .setRequired(true))
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {
        try {
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
                            .setColor("Red")
                    ]
                });
            }

            const channel = interaction.guild.channels.cache.get('1202609770545020988');
            const staffer = interaction.options.getUser('staffer');
            const ruolo = interaction.options.getRole('ruolo');
            const azione = interaction.options.getString('azione');
            const messaggi = interaction.options.getString('messaggi');
            const oreInVoc = interaction.options.getString('ore_in_voc');
            const valutazioniPositive = interaction.options.getString('valutazioni_positive');
            const valutazioniNegative = interaction.options.getString('valutazioni_negative');
            const comportamento = interaction.options.getString('comportamento');
            const partner = interaction.options.getString('partner');
            const stafferMember = interaction.guild.members.cache.get(staffer.id);

const messageRanges = [
                { min: 0, max: 70, percentage: 0 },
                { min: 70, max: 130, percentage: 5 },
                { min: 130, max: 180, percentage: 8 },
                { min: 180, max: 240, percentage: 10 },
                { min: 240, max: 280, percentage: 12 },
                { min: 280, max: 340, percentage: 15 },
                { min: 340, max: 400, percentage: 20 },
                { min: 400, max: Infinity, percentage: 25 }
            ];

            const voiceChatRanges = [
                { min: 0, max: 20, percentage: 0 },
                { min: 20, max: 45, percentage: 5 },
                { min: 45, max: 80, percentage: 10 },
                { min: 80, max: 105, percentage: 12 },
                { min: 105, max: 140, percentage: 15 },
                { min: 140, max: 180, percentage: 20 },
                { min: 180, max: Infinity, percentage: 25 }
            ];

            let messagePercentage = 0;
            let voiceChatPercentage = 0;

            for (const range of messageRanges) {
                if (messaggi >= range.min && messaggi < range.max) {
                    messagePercentage = range.percentage;
                    break;
                }
            }

            for (const range of voiceChatRanges) {
                if (oreInVoc >= range.min && oreInVoc < range.max) {
                    voiceChatPercentage = range.percentage;
                    break;
                }
            }

            if (!stafferMember.roles.cache.has(allowedRoleID)) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Puoi selezionare solo uno staffer con il ruolo specificato.')
                            .setColor("Red")
                    ]
                });
            }

            if (interaction.user.id === staffer.id) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Non puoi usare questo comando su te stesso!')
                            .setColor("Red")
                    ]
                })
            }

            const resocontoEmbed = new EmbedBuilder()
                .setDescription(`<:PM_reply:1262032859959398510> ${ruolo}

                    <a:PM_Flames:1159603888815624192> __Staffer:__ **${staffer.username} | ${staffer.id} | <@${staffer.id}>**
                    > <:PM_White_Dot:1147944922159272088> __Ruolo:__  ${ruolo}
                    > <:PM_White_Dot:1147944922159272088> __Azione:__ ${azione}
                    > <:PM_White_Dot:1147944922159272088> __Messaggi in una settimana:__  ${messaggi} - ${messagePercentage}%
                    > <:PM_White_Dot:1147944922159272088> __Ore in voc in una settimana:__  ${oreInVoc} - ${voiceChatPercentage}%
                    > <:PM_White_Dot:1147944922159272088> __Valutazioni Positive:__ ${valutazioniPositive}
                    > <:PM_White_Dot:1147944922159272088> __Valutazioni Negative:__ ${valutazioniNegative}
                    > <:PM_White_Dot:1147944922159272088> __Comportamento:__ ${comportamento} - %
                    <:PM_White_Dot:1147944922159272088> __Capacità:__ %
                    
                    <:PM_White_Dot:1147944922159272088> __TOTALE:__ %`)
                .setFooter({ text: `Resoconto fatto da ${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}` })
                .setColor('#e1c4ff')
                .setTimestamp()

            await channel.send({ embeds: [resocontoEmbed] });
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Azione eseguita con successo da ${interaction.user.username}.`)
                        .setColor('#e1c4ff')
                ],
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Impossibile trovare il canale di invio del resoconto.`)
                        .setColor('Red')
                ]
            });
        }
    }
};