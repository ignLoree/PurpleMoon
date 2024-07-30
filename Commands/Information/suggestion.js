const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType } = require('discord.js');
const suggestion = require('../../Schemas/Suggestion/suggestionSchema.js');
const formatResults = require('../../Utils/formatResults.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Invia un suggerimento.')
        .addStringOption(option =>
            option.setName('suggerimento')
                .setDescription(`Scrivi il tuo suggerimento.`)
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options } = interaction;
        const Data = await suggestion.findOne({ GuildID: interaction.guild.id });
        const suggestmsg = options.getString('suggerimento')

        try {
            if (!Data) {
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Non hai un sistema di suggerimento attivo.`)
                            .setColor("Red")
                    ]
                });
            } else {
                const schannel = Data.ChannelID;
                const suggestionchannel = interaction.guild.channels.cache.get(schannel);
                const num1 = Math.floor(Math.random() * 256);
                const num2 = Math.floor(Math.random() * 256);
                const num3 = Math.floor(Math.random() * 256);
                const num4 = Math.floor(Math.random() * 256);
                const num5 = Math.floor(Math.random() * 256);
                const num6 = Math.floor(Math.random() * 256);
                const SuggestionID = `${num1}${num2}${num3}${num4}${num5}${num6}`;

                const suggestionembed = new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setThumbnail(interaction.user.displayAvatarURL({ size: 512 }))
                    .setDescription(`**Autore** \n ${interaction.user.username}\n\n **Suggerimento** \n ${suggestmsg}`)
                    .setTimestamp()
                    .setFooter({ text: `User ID: ${interaction.user.id} | sID: ${SuggestionID}` })
                    .addFields({ name: '<:PM_up:1240578881724088323>', value: '**Nessun voto**', inline: true })
                    .addFields({ name: '<:PM_down:1240578945049694218>', value: '**Nessun voto**', inline: true })
                    .addFields({ name: `Voti`, value: formatResults() })

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('upv')
                            .setEmoji('<:PM_up:1240578881724088323>')
                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()
                            .setCustomId('downv')
                            .setEmoji('<:PM_down:1240578945049694218>')
                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()
                            .setCustomId('totalvotes')
                            .setEmoji('<:PM_app:1240579272981348353>')
                            .setStyle(ButtonStyle.Secondary)
                    )

                const button2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('appr')
                            .setEmoji('<:PM_yes:1240579086825422848>')
                            .setStyle(ButtonStyle.Secondary),

                        new ButtonBuilder()
                            .setCustomId('rej')
                            .setEmoji('<:PM_no:1240579035202060370>')
                            .setStyle(ButtonStyle.Secondary)
                    )

                await interaction.reply({
                    embeds:
                        [
                            new EmbedBuilder()
                                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
                                .setDescription(`Hey, ${interaction.user.tag}. Il tuo suggerimento è stato inviato nel canale ${suggestionchannel} per essere votato!
                                
                                Per favore attendi mentre uno staff lo approva o lo rifiuta.
                                
                                Il tuo ID Suggerimento (sID) è ${SuggestionID}`)
                                .setColor('#e1c4ff')
                                .setTimestamp()
                                .setFooter({ text: `Guild ID: ${interaction.guild.id} | sID: ${SuggestionID}` })
                        ], ephemeral: true
                });
                const msg = await suggestionchannel.send({ embeds: [suggestionembed], components: [button, button2] });
                msg.createMessageComponentCollector();

                await suggestion.create({
                    GuildID: interaction.guild.id,
                    ChannelID: suggestionchannel.id,
                    Msg: msg.id,
                    AuthorID: interaction.user.id,
                    upvotes: 0,
                    downvotes: 0,
                    Upmembers: [],
                    Downmembers: []
                })

                await msg.startThread({
                    name: `Thread per il suggerimento ${SuggestionID}`,
                    autoArchiveDuration: 10080,
                });
            }
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
    }
}