const { EmbedBuilder } = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: 'lyrics',

    async execute(message) {
        const args = message.content.split(" ");
        const song = args.slice(1).join(" ");

        try {
            let { body } = await superagent.get(
                `https://some-random-api.com/lyrics?title=${song}`
            );

            const MAX_CHARS = 1024;
            let lyrics = body.lyrics;
            const lyricFields = [];

            while (lyrics.length) {
                lyricFields.push({
                    name: "Lyrics:",
                    value: lyrics.substring(0, MAX_CHARS),
                });
                lyrics = lyrics.substring(MAX_CHARS);
            }

            const lyricembed = new EmbedBuilder()
                .setTitle("Your Lyrics")
                .setColor("#e1c4ff")
                .setThumbnail(body.thumbnail.genius)
                .setURL(body.links.genius)
                .setAuthor({
                    name: `${message.author.tag}`,
                    iconURL: `${message.author.displayAvatarURL()}`,
                })
                .addFields(
                    {
                        name: "Titolo:",
                        value: `${body.title}`,
                        inline: true,
                    },
                    {
                        name: "Artista:",
                        value: `${body.author}`,
                        inline: true,
                    },
                    ...lyricFields
                )

            await message.reply({ embeds: [lyricembed] });
        } catch (error) {
            console.log(error);
            await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription('Si è verificato un errore durante l\'esecuzione del comando.')
                ]
            });
        }
    },
};
