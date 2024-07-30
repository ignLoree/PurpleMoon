const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js')
const countingschema = require('../../Schemas/Counting/countingSchema')
const staff = require('../../Schemas/Staff/staffSchema.js');
const suggestion = require('../../Schemas/Suggestion/suggestionSchema.js');
//const feedback = require('../../Schemas/Feedback/feedbackSchema');
//const confessschema = require('../../Schemas/Confession/confesSchema');
const valutazione = require('../../Schemas/Valutazioni/valSchema');
const welcomeSchema = require('../../Schemas/Welcome/welcomeSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Attiva i servizi di PurpleMoon')
        .addSubcommand(command =>
            command.setName('counting')
                .setDescription('Attiva il sistema di Counting.')
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription('Specifica il canale del counting.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommand(command =>
            command.setName('staff')
                .setDescription(`Attita il sistema dei pex & depex.`)
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription('Specifica il canale dove i log dei pex & depex verranno inviati.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand(command =>
            command.setName('suggestion')
                .setDescription(`Attiva il sistema dei suggerimenti.`)
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription('Specifica il canale dove verranno inviati i suggerimenti.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        /*
        .addSubcommand(command =>
            command.setName('feedback')
                .setDescription(`Attiva il sistema dei feedback.`)
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription('Specifica il canale dove verranno inviati i feedback.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        */
        .addSubcommand(command =>
            command.setName('valutazioni')
                .setDescription(`Attiva il sistema delle valutazioni.`)
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription('Specifica il canale dove verranno inviate le valutazioni.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand(command =>
            command.setName('welcome')
                .setDescription('Attiva il sistema dei welcome.')
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription(`Specifica il canale dove verranno inviati i welcome.`)
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        /*
        .addSubcommand(command =>
            command.setName('confess')
                .setDescription('Attiva il sistema delle confessioni.')
                .addChannelOption(option =>
                    option.setName('canale')
                        .setDescription('Specifica il canale dove verranno inviate le confessioni.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText))
                .addChannelOption(option =>
                    option.setName('logs')
                        .setDescription('Specifica il canale dove verranno inviati i log delle confessioni.')
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText))
        )
        */
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Non hai il permesso per fare questo comando.')
                    .setColor("Red")
            ]
        });

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'welcome':
                const Wchannel = interaction.options.getChannel('canale')
                const welcomedata = await welcomeSchema.findOne({ Guild: interaction.guild.id })

                try {
                    if (welcomedata) {
                        const channel = client.channels.cache.get(welcomedata.ChannelID)
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Hai già un sistema per i welcome attivo nel canale: ${channel}!`)
                                    .setColor("Red")
                            ]
                        });
                    } else {

                        await welcomeSchema.create({
                            GuildID: interaction.guild.id,
                            ChannelID: Wchannel.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor('#e1c4ff')
                            .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per i welcome è stato **attivato** correttamente!`)

                        await interaction.reply({ embeds: [embed] });
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
                break;

            case 'counting':
                const Countchannel = interaction.options.getChannel('canale')
                const countingdata = await countingschema.findOne({ Guild: interaction.guild.id })

                try {
                    if (countingdata) {
                        const channel = client.channels.cache.get(countingdata.Channel)
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Hai già un sistema per il counting attivo nel canale: ${channel}!`)
                                    .setColor("Red")
                            ]
                        });
                    } else {
                        countingschema.create({
                            Guild: interaction.guild.id,
                            Channel: Countchannel.id,
                            Count: 0,
                            LastUser: ' ',
                        })

                        const embed = new EmbedBuilder()
                            .setColor('#e1c4ff')
                            .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per il counting è stato **attivato** correttamente!`)

                        await interaction.reply({ embeds: [embed] })
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
                break;

            case 'staff':
                const Pchannel = interaction.options.getChannel('canale')
                const staffdata = await staff.findOne({ GuildID: interaction.guild.id })

                try {
                    if (staffdata) {
                        const channel = client.channels.cache.get(staffdata.ChannelID)
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Hai già un sistema per i pex & depex attivo nel canale: ${channel}!`)
                                    .setColor("Red")
                            ]
                        });
                    } else {
                        await staff.create({
                            GuildID: interaction.guild.id,
                            ChannelID: Pchannel.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor('e1c4ff')
                            .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per i pex & depex è stato **attivato** correttamente!`)

                        await interaction.reply({ embeds: [embed] });
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
                break;

            case 'suggestion':
                const Schannel = interaction.options.getChannel('canale');
                const suggestdata = await suggestion.findOne({ GuildID: interaction.guild.id });

                try {
                    if (suggestdata) {
                        const channel = client.channels.cache.get(suggestdata.ChannelID);
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Hai già un sistema per i suggerimenti attivo nel canale: ${channel}!`)
                                    .setColor("e1c4ff")
                            ]
                        });
                    } else {

                        await suggestion.create({
                            GuildID: interaction.guild.id,
                            ChannelID: Schannel.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor('#e1c4ff')
                            .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per i suggerimenti è stato **attivato** correttamente!`)

                        await interaction.reply({ embeds: [embed] });
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
                break;
            /*
            case 'feedback':
                const Fchannel = interaction.options.getChannel('canale');
                const feedbackdata = await feedback.findOne({ GuildID: interaction.guild.id });

                try {
                    if (feedbackdata) {
                        const channel = client.channels.cache.get(feedbackdata.ChannelID);
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Hai già un sistema per i feedback attivo nel canale: ${channel}!`)
                                    .setColor("e1c4ff")
                            ]
                        });
                    } else {

                        await feedback.create({
                            GuildID: interaction.guild.id,
                            ChannelID: Fchannel.id
                        })

                        const embed = new EmbedBuilder()
                            .setColor('#e1c4ff')
                            .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per i feedback è stato **attivato** correttamente!`)

                        await interaction.reply({ embeds: [embed] });
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
                break;
            */

            case 'valutazioni':
                const vchannel = interaction.options.getChannel('canale');
                const valdata = await valutazione.findOne({ GuildID: interaction.guild.id });

                try {
                    if (valdata) {
                        const channel = client.channels.cache.get(valdata.ChannelID);
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Hai già un sistema per le valutazioni attivo nel canale: ${channel}!`)
                                    .setColor("e1c4ff")
                            ]
                        });
                    } else {

                        await valutazione.create({
                            GuildID: interaction.guild.id,
                            ChannelID: vchannel.id,
                            valutazione: 0,
                            User: ''
                        })

                        const embed = new EmbedBuilder()
                            .setColor('#e1c4ff')
                            .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per le valutazioni è stato **attivato** correttamente!`)

                        await interaction.reply({ embeds: [embed] });
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
                break;

            /*
        case "confess":
            const channelC = interaction.options.getChannel('canale');
            const logs = interaction.options.getChannel('logs');
            const confessdata = await confessschema.findOne({ Guild: interaction.guild.id });

            try {
                if (confessdata) {
                    const channel = client.channels.cache.get(confessdata.Channel);
                    return await interaction.reply({ 
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Hai già un sistema per le confessioni attivo nel canale: ${channel}!`)
                                .setColor("e1c4ff")
                        ]
                    })
                } else {
                    if (logs) {
                        await confessschema.create({
                            Guild: interaction.guild.id,
                            Channel: channelC.id,
                            Logs: logs.id
                        })
                    } else {
                        await confessschema.create({
                            Guild: interaction.guild.id,
                            Channel: channelC.id,
                            Logs: ' '
                        })
                    }

                    const setupembed = new EmbedBuilder()
                        .setColor('#e1c4ff')
                        .setDescription(`<:BG_green_check:1147087213495078913>・Il sistema per le confessioni è stato **attivato** correttamente!`)

                    await interaction.reply({ embeds: [setupembed] });
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
            */
        }
    }
}