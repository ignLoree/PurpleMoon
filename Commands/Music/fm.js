const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const LastFmUser = require('../../Schemas/LastFm/LastFmUser')
const spotifyClientId = '62be99af56be4ea4885b647661fa02da';
const spotifyClientSecret = '282405fa25e743d0a5c78850a478bb12';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fm')
        .setDescription('Mostra la canzone che stai ascoltando e la canzone precedente.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utente che vuoi controllare.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user') || interaction.user;
        const user = await LastFmUser.findOne({ discordId: target.id });

        if (!user) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`Non ho trovato ${target.id === interaction.user.id ? "il tuo username di Last.fm" : "lo username di Last.fm dell'utente specificato"}, importalo usando /import.`)
                ]
            });
        }

        const apiKey = '48ba17fdba5038263f682d6f2d104f71';
        const lastFmUsername = user.lastFmUsername;

        const recentTracksUrl = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFmUsername}&api_key=${apiKey}&format=json&limit=2`;
        const userInfoUrl = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${lastFmUsername}&api_key=${apiKey}&format=json`;

        try {
            const [recentTracksResponse, userInfoResponse] = await Promise.all([
                axios.get(recentTracksUrl),
                axios.get(userInfoUrl),
            ]);

            const recentTracksData = recentTracksResponse.data;
            const userInfoData = userInfoResponse.data;

            if (recentTracksData.recenttracks.track.length > 0) {
                const currentTrack = recentTracksData.recenttracks.track[0];
                const previousTrack = recentTracksData.recenttracks.track[1] || currentTrack;
                const trackPlaycount = await getTrackPlaycount(apiKey, lastFmUsername, currentTrack);
                const totalScrobbles = userInfoData.user.playcount;
                let imageUrl = await getTrackImage(currentTrack, spotifyClientId, spotifyClientSecret, apiKey);

                const embed = new EmbedBuilder()
                .setAuthor({ name: `Riproducendo in questo momento - ${target.displayName}`, iconURL: target.displayAvatarURL() })
                .setColor('#e1c4ff')
                .setThumbnail(imageUrl)
                .setTitle(`**${currentTrack.name}**`)
                .setURL(`${getTrackUrl(currentTrack)}`)
                .setDescription(`**${currentTrack.artist['#text']}**・*${currentTrack.album['#text']}*`)
                .setFooter({ text: `${totalScrobbles} ascolti totali` })

                await interaction.reply({ embeds: [embed] });
            } else {
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('Red')
                            .setDescription('Non sono state trovate tracce recenti.')
                    ]
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('Si è verificato un errore durante il recupero dei dati di Last.fm.')
                ]
            });
        }
    },
};

async function getSpotifyAccessToken() {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64'),
        },
    });
    return response.data.access_token;
}

async function getTrackPlaycount(apiKey, username, track) {
    const trackInfoUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(track.artist['#text'])}&track=${encodeURIComponent(track.name)}&username=${username}&format=json`;
    try {
        const response = await axios.get(trackInfoUrl);
        return response.data.track.userplaycount || "0";
    } catch (error) {
        console.error(error);
        return "0";
    }
}

function getTrackUrl(track) {
    return `https://www.last.fm/music/${encodeURIComponent(track.artist['#text'])}/_/${encodeURIComponent(track.name)}`;
}

async function getTrackImage(track, clientId, clientSecret) {
    const spotifyAccessToken = await getSpotifyAccessToken(clientId, clientSecret);

    let query = `track:${encodeURIComponent(track.name)} artist:${encodeURIComponent(track.artist['#text'])} album:${encodeURIComponent(track.album['#text'])}`;
    let imageUrl = await searchSpotifyForImage(query, spotifyAccessToken);

    if (imageUrl) {
        return imageUrl;
    }

    query = `track:${encodeURIComponent(track.name)} artist:${encodeURIComponent(track.artist['#text'])}`;
    imageUrl = await searchSpotifyForImage(query, spotifyAccessToken);

    if (imageUrl) {
        return imageUrl;
    }

    return track.image.find(img => img.size === 'large')['#text'] || 'https://via.placeholder.com/150';
}

async function searchSpotifyForImage(query, accessToken) {
    try {
        const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });
        if (searchResponse.data.tracks.items.length > 0 && searchResponse.data.tracks.items[0].album.images.length > 0) {
            return searchResponse.data.tracks.items[0].album.images[0].url;
        }
    } catch (error) {
        console.error(error);
    }
    return null;
}