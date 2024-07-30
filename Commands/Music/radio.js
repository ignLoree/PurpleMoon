const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');

const radioChannels = {
    "Radio Italia": "https://stream10.xdevel.com/audio1s977004-1749/stream/icecast.audio",
    "RDS": "https://icstream.rds.radio/rdsrelax",
    "Radio 105": "http://icecast.unitedradio.it/Radio105.mp3",
    "Radio Kiss Kiss": "https://kisskiss.fluidstream.eu/KissKiss.mp3",
    "Virgin Radio": "http://icecast.unitedradio.it/Virgin.mp3",
    "Radio R101": "http://icecast.unitedradio.it/r101_mp3",
    "Radio Monte Carlo": "http://edge.radiomontecarlo.net/RMC.mp3"
};

let connection;
let player;
let currentVolume = 50;
let previousVolumes = {};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('radio')
        .setDescription('Ascolta una radio.'),
    async execute(interaction) {
        const { guild, member } = interaction;

        const radioOptions = Object.keys(radioChannels).map(channel => ({
            label: channel.toUpperCase(),
            value: channel
        }));

        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('radioSelect')
                    .setPlaceholder('Seleziona una radio.')
                    .addOptions(radioOptions)
            );

        const embed = new EmbedBuilder()
            .setColor('#e1c4ff')
            .setTitle('Seleziona Radio')
            .setDescription('Seleziona un canale radio dall\'elenco a discesa')
            .setTimestamp();

        const volumeDownButton = new ButtonBuilder()
            .setCustomId('volumeDown')
            .setEmoji('🔈')
            .setStyle(ButtonStyle.Secondary);

        const volumeUpButton = new ButtonBuilder()
            .setCustomId('volumeUp')
            .setEmoji('🔊')
            .setStyle(ButtonStyle.Secondary);

        const stopButton = new ButtonBuilder()
            .setCustomId('stop')
            .setEmoji('⏹')
            .setStyle(ButtonStyle.Secondary);

        const buttonRow = new ActionRowBuilder()
            .addComponents( volumeDownButton, volumeUpButton, stopButton);

        await interaction.reply({ embeds: [embed], components: [buttonRow, row] });

        const filter = i => i.customId === 'radioSelect' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        let buttonCollector;

        collector.on('collect', async i => {
            if (!i.isStringSelectMenu()) return;

            const selectedChannel = i.values[0];
            const url = radioChannels[selectedChannel];

            try {
                if (!member.voice.channel) {
                    throw new Error('Per utilizzare la radio è necessario essere in una vocale!');
                }

                connection = joinVoiceChannel({
                    channelId: member.voice.channel.id,
                    guildId: guild.id,
                    adapterCreator: guild.voiceAdapterCreator
                });

                player = createAudioPlayer();
                connection.subscribe(player);

                let volume = currentVolume / 100;
                if (previousVolumes[selectedChannel]) {
                    volume = previousVolumes[selectedChannel] / 100;
                } else {
                    previousVolumes[selectedChannel] = currentVolume;
                }

                const resource = createAudioResource(url, { inlineVolume: true, volume });
                player.play(resource);

                embed.setDescription(`📻 Canale radio selezionato: ${selectedChannel} \n 🔉 Volume: ${currentVolume}%`);
                await i.update({ embeds: [embed], components: [buttonRow, row] });

                const buttonFilter = i => i.customId === 'volumeUp' || i.customId === 'volumeDown' || i.customId === 'stop';

                if (buttonCollector) buttonCollector.stop();

                buttonCollector = interaction.channel.createMessageComponentCollector({ filter: buttonFilter, time: 60000 });

                buttonCollector.on('collect', async buttonInteraction => {
                    if (buttonInteraction.isButton()) {
                        const { customId } = buttonInteraction;
                        switch (customId) {
                            case 'volumeUp':
                                if (currentVolume < 100) {
                                    previousVolumes[selectedChannel] = currentVolume; // Előző hangerő frissítése
                                    currentVolume += 10;
                                    player.state.resource.volume?.setVolume(currentVolume / 100);
                                    embed.setDescription(`📻 Canale radio selezionato: ${selectedChannel} \n 🔉 Volume: ${currentVolume}%`);
                                }
                                break;
                            case 'volumeDown':
                                if (currentVolume > 0) {
                                    previousVolumes[selectedChannel] = currentVolume; // Előző hangerő frissítése
                                    currentVolume -= 10;
                                    player.state.resource.volume?.setVolume(currentVolume / 100);
                                    embed.setDescription(`📻 Canale radio selezionato: ${selectedChannel} \n 🔉 Volume: ${currentVolume}%`);
                                }
                                break;
                            case 'stop':
                                player.stop(connection);
                                connection.destroy();
                                break;
                        }
                        await buttonInteraction.update({ embeds: [embed], components: [buttonRow, row] });
                    }
                });

            } catch (error) {
                console.error(error);
                await interaction.editReply({ content: error.message, embeds: [], components: [] });
            }
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
                await interaction.editReply({ content: 'Non hai scelto un canale in tempo', embeds: [], components: [] });
            }
        });
    },
};

