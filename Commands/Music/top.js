const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const LastFmUser = require('../../Schemas/LastFm/LastFmUser')
const collectorMap = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Mostra i tuoi 10 migliori artisti, album o tracce per un periodo di tempo specificato.')
        .addStringOption(option =>
            option.setName('tipo')
                .setDescription('Tipo di ricerca: artisti, album o tracce.')
                .setRequired(true)
                .addChoices(
                    { name: 'Artisti', value: 'artisti' },
                    { name: 'Album', value: 'album' },
                    { name: 'Tracce', value: 'tracce' }
                ))
        .addStringOption(option =>
            option.setName('tempo')
                .setDescription('Data e ora della ricerca.')
                .setRequired(true)
                .addChoices(
                    { name: 'Settimanale', value: '7day' },
                    { name: 'Mensile', value: '1month' },
                    { name: 'Quadrimestrale', value: '3month' },
                    { name: 'Semestrale', value: '6month' },
                    { name: 'Annuale', value: '12month' },
                    { name: 'Alltime', value: 'overall' }
                ))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utente da controllare. Predefinito se non specificato.')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();
        const type = interaction.options.getString('tipo');
        const timeChoice = interaction.options.getString('tempo');
        const timeMapping = {
            '7day': 'weekly',
            '1month': 'monthly',
            '3month': 'quarterly',
            '6month': 'half-yearly',
            '12month': 'yearly',
            'overall': 'alltime'
        };
        const time = timeMapping[timeChoice].toLowerCase();
        const apiKey = '48ba17fdba5038263f682d6f2d104f71';
        const target = interaction.options.getUser('user') || interaction.user;

        const ITEMS_PER_PAGE = 10;
        let page = 1;

        try {
            const user = await LastFmUser.findOne({ discordId: target.id });
            if (!user) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setDescription(`${target.id === interaction.user.id ? 'Il tuo username' : 'Lo username dell\'utente specificato'} non è stato impostato.`)
                    ]
                });
            }
            const lastFmUsername = user.lastFmUsername;

            let methodSuffix;
            switch (type) {
                case 'artisti':
                    methodSuffix = 'gettopartists';
                    break;
                case 'album':
                    methodSuffix = 'gettopalbums';
                    break;
                case 'tracce':
                    methodSuffix = 'gettoptracks';
                    break;
            }

            const url = `http://ws.audioscrobbler.com/2.0/?method=user.${methodSuffix}&user=${encodeURIComponent(lastFmUsername)}&api_key=${apiKey}&format=json&period=${timeChoice}&limit=${ITEMS_PER_PAGE}&page=${page}`;
            const response = await axios.get(url);

            const items = response.data.topartists?.artist || response.data.topalbums?.album || response.data.toptracks?.track;
            if (!items) {
                throw new Error('Recupero dei dati non riuscito.');
            }

            const topItems = items.map((item, index) => {
                const name = item.name;
                const playcount = item.playcount;
                const artist = item.artist?.name || "";
                const url = item.url;
                const formattedName = type === 'artisti' ? `**[${name}](${url})**` :
                    type === 'tracce' ? `**${artist}** - [**${name}**](${url})` :
                        type === 'album' ? `**${artist}** - [**${name}**](${url})` : "";
                return `${index + 1 + (page - 1) * ITEMS_PER_PAGE}. ${formattedName} - *${playcount} ascolti*`;
            }).join('\n');

            const totalScrobbles = items.reduce((acc, item) => acc + parseInt(item.playcount, 10), 0);
            const category = type.charAt(0).toUpperCase() + type.slice(1);

            const embed = {
                author: {
                    name: `Top ${time} ${category.toLowerCase()} per ${target.displayName}`,
                    icon_url: target.displayAvatarURL(),
                },
                color: 0xe1c4ff,
                description: topItems,
                footer: {
                    text: `${totalScrobbles} ${type} ascoltate in questo periodo di tempo | Pagina ${page}`,
                },
            };

            const buttons = [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 1,
                            emoji: {
                                id: '1213943606617055262',
                                name: 'previous'
                            },
                            custom_id: "previous_page",
                            disabled: page === 1
                        },
                        {
                            type: 2,
                            style: 1,
                            emoji: {
                                id: '1213943555358466191',
                                name: 'next'
                            },
                            custom_id: "next_page"
                        }
                    ]
                }
            ];

            await interaction.editReply({ embeds: [embed], components: buttons });

            const filter = i => i.customId === 'previous_page' || i.customId === 'next_page';
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });

            collector.on('collect', async i => {
                if (i.customId === 'previous_page' && page > 1) {
                    page--;
                } else if (i.customId === 'next_page') {
                    page++;
                }

                const newUrl = `http://ws.audioscrobbler.com/2.0/?method=user.${methodSuffix}&user=${encodeURIComponent(lastFmUsername)}&api_key=${apiKey}&format=json&period=${timeChoice}&limit=${ITEMS_PER_PAGE}&page=${page}`;
                const newResponse = await axios.get(newUrl);

                const newItems = newResponse.data.topartists?.artist || newResponse.data.topalbums?.album || newResponse.data.toptracks?.track;
                const newTopItems = newItems.map((item, index) => {
                    const name = item.name;
                    const playcount = item.playcount;
                    const artist = item.artist?.name || "";
                    const url = item.url;
                    const formattedName = type === 'artisti' ? `**[${name}](${url})**` :
                        type === 'tracce' ? `**${artist}** - [**${name}**](${url})` :
                            type === 'album' ? `**${artist}** - [**${name}**](${url})` : "";
                    return `${index + 1 + (page - 1) * ITEMS_PER_PAGE}. ${formattedName} - *${playcount} ascolti*`;
                }).join('\n');

                const newTotalScrobbles = newItems.reduce((acc, item) => acc + parseInt(item.playcount, 10), 0);

                const newEmbed = {
                    author: {
                        name: `Top ${time} ${category.toLowerCase()} per ${target.displayName}`,
                        icon_url: target.displayAvatarURL(),
                    },
                    description: newTopItems,
                    color: 0xe1c4ff,
                    footer: {
                        text: `${newTotalScrobbles} ${type} ascoltate in questo periodo di tempo | Pagina ${page}`,
                    },
                };

                if (newEmbed.footer.text.includes("Pagina 2")) {
                    buttons[0].components[0].disabled = false;
                }

                await i.update({ embeds: [newEmbed], components: buttons });
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.followUp({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription('Tempo scaduto.')
                        ], ephemeral: true
                    });
                }

                collector.stop();
                collectorMap.delete(interaction.id);
            });

            collectorMap.set(interaction.id, collector);

        } catch (error) {
            console.error(error);
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('Si è verificato un errore durante il recupero degli elementi principali. Riprova più tardi.')
                ]
            });
        }
    }
};
