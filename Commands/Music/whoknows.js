const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const LastFmUser = require('../../Schemas/LastFm/LastFmUser')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whoknows')
        .setDescription('Mostra chi conosce l\'artista che stai ascoltando o un artista specificato.')
        .addStringOption(option =>
            option.setName('artista')
                .setDescription('L\'artista da controllare. Lasciare vuoto per utilizzare l\'artista che stai ascoltando ora.')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();
        const artistName = interaction.options.getString('artista');
        const apiKey = '48ba17fdba5038263f682d6f2d104f71';
        const clientId = "62be99af56be4ea4885b647661fa02da";
        const clientSecret = "282405fa25e743d0a5c78850a478bb12";

        let queryArtist = artistName;

        if (!artistName) {
            const discordId = interaction.user.id;
            const user = await LastFmUser.findOne({ discordId });
            if (!user) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setDescription('È necessario impostare il nome utente Last.fm prima.')
                    ]
                });
            }

            const recentTracksUrl = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user.lastFmUsername}&api_key=${apiKey}&format=json&limit=1`;
            const response = await axios.get(recentTracksUrl);
            if (!response.data.recenttracks.track[0]) {
                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setDescription('Nessuna traccia recente trovata per il tuo account Last.fm.')
                    ]
                });
            }

            queryArtist = response.data.recenttracks.track[0].artist['#text'];
        }

        const artistInfoUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(queryArtist)}&api_key=${apiKey}&format=json`;
        const artistInfoResponse = await axios.get(artistInfoUrl);
        const artistInfo = artistInfoResponse.data.artist;
        const artistTags = artistInfo.tags.tag.map(tag => tag.name).join(' - ');

        let thumbnailUrl = 'https://via.placeholder.com/150';
        try {
            const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
                params: {
                    grant_type: 'client_credentials'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
                }
            });
            const accessToken = tokenResponse.data.access_token;
            const artistSearchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(queryArtist)}&type=artist`;
            const artistSearchResponse = await axios.get(artistSearchUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const artist = artistSearchResponse.data.artists.items[0];
            if (artist && artist.images.length > 0) {
                thumbnailUrl = artist.images[0].url;
            }
        } catch (error) {
            console.error(error);
        }

        const guildMemberIds = new Set(interaction.guild.members.cache.map(member => member.id));
        const allUsersInGuild = await LastFmUser.find({ discordId: { $in: Array.from(guildMemberIds) } });

        const userScrobblesPromises = allUsersInGuild.map(async (user) => {
            try {
                const userInfoUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(queryArtist)}&user=${user.lastFmUsername}&api_key=${apiKey}&format=json`;
                const response = await axios.get(userInfoUrl);
                const playcount = response.data.artist.stats.userplaycount || 0;
                return { username: user.discordId, lastFmUsername: user.lastFmUsername, playcount: parseInt(playcount, 10) };
            } catch (error) {
                console.error(error);
                return { username: user.discordId, lastFmUsername: user.lastFmUsername, playcount: 0 };
            }
        });

        const userScrobbles = await Promise.all(userScrobblesPromises);
        const sortedUsers = userScrobbles.filter(user => user.playcount > 0).sort((a, b) => b.playcount - a.playcount);
        const totalListeners = sortedUsers.length;
        const totalScrobbles = sortedUsers.reduce((acc, user) => acc + user.playcount, 0);

        const userIndex = sortedUsers.findIndex(user => user.username === interaction.user.id);
        if (userIndex === -1) {
            sortedUsers.push({ username: interaction.user.id, lastFmUsername: interaction.user.username, playcount: 0 });
        }

        let leaderboardDescription = sortedUsers.map((user, index) => {
            let place = `${index + 1}.`;
            if (index === 0) {
                place = ':crown:';
            }
            const displayName = interaction.guild.members.cache.get(user.username)?.displayName || 'Sconosciuto';
            const formattedUsername = user.username === interaction.user.id ? `**[${displayName}](https://www.last.fm/user/${user.lastFmUsername})**` : `[${displayName}](https://www.last.fm/user/${user.lastFmUsername})`;
            return `${place} ${formattedUsername} - **${user.playcount}** ascolti`;
        }).join('\n');

        const embed = {
            type: 'rich',
            title: `**${queryArtist}** in ${interaction.guild.name}`,
            description: leaderboardDescription,
            color: 0xe1c4ff,
            thumbnail: {
                url: thumbnailUrl,
            },
            footer: {
                text: `${artistTags} - ${totalListeners} ascoltatori - ${totalScrobbles} ascolti totali`,
            },
        };

        await interaction.editReply({ embeds: [embed] });
    }
};
