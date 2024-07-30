const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js')
const { default: axios } = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('copy')
        .setDescription('Ruba e aggiungi sul tuo server.')
        .addSubcommand(sub =>
            sub.setName('emoji')
                .setDescription('Ruba un\'emoji e aggiungila al tuo server.')
                .addStringOption(option =>
                    option.setName('id')
                        .setDescription('L\'emoji che vuoi rubare.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('nome')
                        .setDescription('Il nome per l\'emoji.')
                        .setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub.setName('sticker')
                .setDescription('Ruba uno sticker.'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand()

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Non hai il permesso per fare questo comando.')
                    .setColor("Red")
            ]
        });

        switch (sub) {
            case 'emoji':

                let emoji = interaction.options.getString('id')?.trim();
                const name = interaction.options.getString('nome');

                if (emoji.startsWith("<") && emoji.endsWith(">")) {
                    const id = emoji.match(/\d{15,}/g)[0];

                    const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
                        .then(image => {
                            if (image) return "gif"
                            else return "png"
                        }).catch(err => {
                            return "png"
                        })

                    emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
                }

                if (!emoji.startsWith("http")) {
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription("Non puoi rubare le emoji predefinite!")
                        ], ephemeral: true
                    })
                }

                if (!emoji.startsWith("https")) {
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription("Non puoi rubare le emoji predefinite!")
                        ], ephemeral: true
                    })
                }

                interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}` })
                    .then(emoji => {
                        const embed = new EmbedBuilder()
                            .setColor("#e1c4ff")
                            .setDescription(`Aggiunta l'emoji ${emoji}, con il nome ${name}`)

                        return interaction.reply({ embeds: [embed] });
                    }).catch(err => {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription("Non puoi aggiungere questa emoji perché hai raggiunto il limite di emoji del server.")
                            ], ephemeral: true
                        })
                    })
                break;

            case 'sticker':
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#e1c4ff')
                            .setDescription(`<a:PM_Online:1148031572876996618> Aspetto lo sticker...`)
                    ]
                })
                const filter = (m) => m.author.id === interaction.user.id;
                const collector = interaction.channel.createMessageCollector({ filter: filter, time: 15000, max: 1 });

                collector.on('collect', async m => {
                    const sticker = m.stickers.first();

                    const { guild } = interaction;

                    if (m.stickers.size == 0) return await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription(`<:PM_Red_Cancel:1147087256046272612> Questo non è uno sticker...`)
                        ], ephemeral: true
                    })

                    if (sticker.url.endsWith('.json')) return await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription(`<:PM_Red_Cancel:1147087256046272612> Non è uno sticker valido...`)
                        ], ephemeral: true
                    })

                    try {
                        const newSticker = await guild.stickers.create({
                            name: sticker.name,
                            description: sticker.description || '',
                            tags: sticker.tags,
                            file: sticker.url
                        })

                        await interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('#e1c4ff')
                                    .setDescription(`<:PM_Green_Check:1147087213495078913> Lo sticker col nome **${newSticker.name}** è stato creato!`)
                            ]
                        })
                    } catch (err) {
                        console.log(err)
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription("Non puoi aggiungere questo sticker perché hai raggiunto il limite di sticker del server.")
                            ], ephemeral: true
                        })
                    }

                })

                collector.on('end', async reason => {
                    if (reason === 'time') return await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription(`Scaduto il tempo..`)
                        ], ephemeral: true
                    })

                })
        }
    }
}