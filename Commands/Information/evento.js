const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('evento')
        .setDescription('Iscriviti a un evento sul nostro server.')
        .addSubcommand(sub =>
            sub.setName('server')
                .setDescription(`Inserisci un serve all'interno dell'evento tra server di PurpleMoon.`)
                .addStringOption(option =>
                    option.setName('link')
                        .setDescription("Il link del server.")
                        .setRequired(true)
                )
                .addUserOption(option =>
                    option.setName('owner')
                        .setDescription("L'owner del server.")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('membri')
                        .setDescription("Seleziona il numero di membri del server.")
                        .setRequired(true)
                        .addChoices(
                            { name: '1000+', value: '1000+' },
                            { name: '1000-', value: '1000-' },
                        ))
        ),
    /*.addSubcommand(sub =>
        sub.setName('film')
            .setDescription('Consiglia un film per la serata film.')
            .addStringOption(option =>
                option.setName('nome')
                    .setDescription("Il nome del film che vorresti vedere.")
                    .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('giorno')
                    .setDescription("Scrivi il giorno in cui vorresti vedere il film.")
                    .setRequired(true)
                    .addChoices(
                        { name: 'Lunedì', value: 'Lunedì' },
                        { name: 'Martedì', value: 'Martedì' },
                        { name: 'Mercoledì', value: 'Mercoledì' },
                        { name: 'Giovedì', value: 'Giovedì' },
                        { name: 'Venerdì', value: 'Venerdì' },
                        { name: 'Sabato', value: 'Sabato' },
                        { name: 'Domenica', value: 'Domenica' },
                    ))
    ), */
    /*.addSubcommand(sub =>
        sub.setName('brawlstars')
            .setDescription('Iscriviti al torneo di Brawl Stars sul nostro server.')
            .addStringOption(option =>
                option.setName('nome')
                    .setDescription("Scrivi il nome del tuo account Brawl Stars.")
                    .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('id')
                    .setDescription("Scrivi l'ID del tuo account Brawl Stars.")
                    .setRequired(true)
            )
    )*/

    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();

        switch (sub) {

            case 'server':
                try {
                    const link = interaction.options.getString('link');
                    const owner = interaction.options.getUser('owner');
                    const membri = interaction.options.getString('membri');
                    const channel2k = interaction.guild.channels.cache.get('1246048502686158868');
                    const channel1k = interaction.guild.channels.cache.get('1246048570793136239');
                    let targetChannel;

                    if (membri === '1000+') {
                        targetChannel = channel2k;
                    } else if (membri === '1000-') {
                        targetChannel = channel1k;
                    }

                    if (!targetChannel) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Il canale non è stato trovato.`)
                                    .setColor('Red')
                            ],
                            ephemeral: true
                        })
                    }

                    const messageContent = `<a:PM_GoldenCrown:1219795702121631754> **Owner**: ${owner}\n<:PM_Ping:1159603723245461565> **Link:** ${link}`;
                    const sentMessage = await targetChannel.send({ content: messageContent });

                    await sentMessage.react('<a:PM_Butterfly:1159597588912296029>');

                    interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`Server aggiunto all'evento nel canale ${targetChannel}`)
                            .setColor('#e1c4ff')
                        ]
                    })
                } catch (err) {
                    console.error(err)
                    await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Errore durante l'esecuzione del comando.`)
                                .setColor('Red')
                        ]
                    })
                }

        }

        /*case 'film':
            try {
                const nome = interaction.options.getString('nome');
                const giorno = interaction.options.getString('giorno');
                const channel = interaction.guild.channels.cache.get('1224759161477136504');
                const member = interaction.guild.members.cache.get(interaction.user.id);

                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                    .setTitle('<:PM_Flower_Purple:1159603734221946922> Nuova Richiesta!')
                    .setThumbnail(`${client.user.displayAvatarURL()}`)
                    .setDescription(`<a:PM_Festa:1159603524116676648> Grazie per aver **suggerito** un film e una data per l'evento. 
                \n <a:PM_Punto:1159603819752194099> Ti ricordiamo di **leggere** il canale <#1143578402364862565> per sapere più __informazioni__ sull'evento. 
                \n <a:PM_Flash:1148010092046864394> **Il film e il giorno dell'evento verranno annunciati nel canale <#1141792831703367680>.**`)
                    .addFields(
                        {
                            name: '<:PM_PopCorn:1202326134298247168> Nome Film:',
                            value: `${nome}`,
                            inline: true,
                        },
                        {
                            name: '<a:PM_Hourglass:1148010095398113382> Giorno:',
                            value: `${giorno}`,
                            inline: true,
                        },
                    )
                    .setColor('#e1c4ff')
                    .setTimestamp()
                    .setFooter({ text: `Grazie per aver suggerito un film e un giorno per l'evento!`, iconURL: `${interaction.guild.iconURL()}` })

                channel.send({ content: `${interaction.user}`, embeds: [embed] })
                    .then(sentMessage => {
                        sentMessage.react('<:PM_Green_Thumbs_Up:1147087244641968269>');
                    })
                    .catch(console.error);
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`La tua richiesta è stata inviata in ${channel}`)
                        .setColor('#e1c4ff')
                    ]
                })
            } catch (err) {
                console.error(err)
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Errore durante l'esecuzione del comando.`)
                            .setColor('Red')
                    ]
                })
            }

            break;
            /*

        /*case 'brawlstars':
            try {
                const nome = interaction.options.getString('nome');
                const id = interaction.options.getString('id');

                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                    .setTitle('<:PM_Flower_Purple:1159603734221946922> Nuova Iscrizione!')
                    .setThumbnail(`${client.user.displayAvatarURL()}`)
                    .setDescription(`<a:PM_Festa:1159603524116676648> Grazie per esserti **iscrittə** al nostro torneo di __Brawl Stars__, hai **ricevuto** il __ruolo__ <@&1212489461946912838> e ora potrai __chattare__ con gli altri in <#1212489400555151370>. Qui potrai anche **cercare** la persona con cui fare __squadra__ e potrai **commentare** insieme a __noi__ durante l'**evento**. 
                \n <a:PM_Punto:1159603819752194099> Ti ricordiamo di **leggere** il canale <#1212458575260028978> per sapere più __informazioni__ sull'evento. 
                \n <:PM_Ticket:1148995976267317258>  **Se non potrai** più a __partecipare__ all'evento **apri** un <#1027909064421806100> \`HIGH STAFF\` o scrivi in DM a <@769236347676000277>.`)
                    .addFields(
                        {
                            name: '<:PM_Api:1175839918984011868> Nome Account:',
                            value: `${nome}`,
                            inline: true,
                        },
                        {
                            name: '<:PM_Database:1175839913615294596> ID Account:',
                            value: `${id}`,
                            inline: true,
                        },
                    )
                    .setColor('#e1c4ff')
                    .setTimestamp()
                    .setFooter({ text: `Grazie per esserti iscrittə al nostro torneo!`, iconURL: `${interaction.guild.iconURL()}` })

                member.roles.add('1212489461946912838');
                channel.send({ content: `${interaction.user}`, embeds: [embed] })
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`La tua iscrizione è stata inviata in ${channel}`)
                        .setColor('#e1c4ff')
                    ]
                })
            } catch (err) {
                console.error(err)
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Errore durante l'esecuzione del comando.`)
                            .setColor('Red')
                    ]
                })
            }

            break;
        */
    }
}