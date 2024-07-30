const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js')
const countingschema = require('../../Schemas/Counting/countingSchema')
const staff = require('../../Schemas/Staff/staffSchema.js');
const suggestion = require('../../Schemas/Suggestion/suggestionSchema.js');
//const confessschema = require('../../Schemas/Confession/confesSchema');
//const feedback = require('../../Schemas/Feedback/feedbackSchema');
const valutazione = require('../../Schemas/Valutazioni/valSchema');
const welcomeSchema = require('../../Schemas/Welcome/welcomeSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disable')
        .setDescription('Disabilita dei servizi di PurpleMoon.')
        .addSubcommand(command =>
            command.setName('counting')
                .setDescription('Disabilita il counting.')
        )
        .addSubcommand(command =>
            command.setName('staff')
                .setDescription(`Disabilita il pex & depex.`)
        )
        .addSubcommand(command =>
            command.setName('suggestion')
                .setDescription(`Disabilita i suggerimenti.`)
        )
        /*
        .addSubcommand(command =>
            command.setName('feedback')
                .setDescription(`Disabilita i feedback.`)
        )
        */
        .addSubcommand(command =>
            command.setName('valutazioni')
                .setDescription(`Disabilita le valutazione.`)
        )
        .addSubcommand(command =>
            command.setName('welcome')
                .setDescription(`Disabilita il welcome.`)
        )
        /*
        .addSubcommand(command =>
            command.setName('confess')
                .setDescription('Disabilita le confessioni.')
        )
        */
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

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
                const welcomedata = await welcomeSchema.findOne({ Guild: interaction.guild.id });
                try {
                    if (!welcomedata) {
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Non hai un sistema per il welcome attivo.`)
                                    .setColor('Red')
                            ]
                        })
                    } else {
                        await welcomeSchema.deleteMany({ Guild: interaction.guild.id })

                        const embed = new EmbedBuilder()
                            .setDescription(`👋 Welcome **disattivato** correttamente.`)
                            .setColor("#e1c4ff")

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

            case 'counting':
                const countdata = await countingschema.findOne({ Guild: interaction.guild.id });
                try {
                    if (!countdata) {
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Non hai un sistema per il counting attivo.`)
                                    .setColor('Red')
                            ]
                        })
                    } else {
                        await countingschema.deleteMany({ Guild: interaction.guild.id });

                        const embed = new EmbedBuilder()
                            .setDescription(`🔢 Counting **disattivato** correttamente.`)
                            .setColor("#e1c4ff")

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
                const staffdata = await staff.findOne({ GuildID: interaction.guild.id });
                try {
                    if (!staffdata) {
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Non hai un sistema per il pex & depex attivo.`)
                                    .setColor("Red")
                            ]
                        });
                    } else {
                        await staff.deleteMany({
                            GuildID: interaction.guild.id
                        });

                        const embed = new EmbedBuilder()
                            .setDescription(`👮 Pex & Depex **disattivato** correttamente.`)
                            .setColor("#e1c4ff")

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

            case 'suggestion':
                const suggestiondata = await suggestion.findOne({ GuildID: interaction.guild.id });
                try {
                    if (!suggestiondata) {
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Non hai un sistema per i suggerimenti attivo.`)
                                    .setColor("Red")
                            ]
                        });
                    } else {
                        await suggestion.deleteMany({
                            GuildID: interaction.guild.id
                        });

                        const embed = new EmbedBuilder()
                            .setDescription(`❓ Suggerimenti **disattivato** correttamente.`)
                            .setColor("#e1c4ff")

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
            /*
        case 'feedback':
            const feedbackdata = await feedback.findOne({ GuildID: interaction.guild.id });
            try {
                if (!feedbackdata) {
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Non hai un sistema per i feedback attivo.`)
                                .setColor("Red")
                        ]
                    });
                } else {
                    await feedback.deleteMany({
                        GuildID: interaction.guild.id
                    });

                    const embed = new EmbedBuilder()
                        .setDescription(`☑️ Feedback **disattivato** correttamente.`)
                        .setColor("#e1c4ff")

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
            */

            case 'valutazioni':
                const valdata = await valutazione.findOne({ GuildID: interaction.guild.id });
                try {
                    if (!valdata) {
                        return await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`Non hai un sistema per le valutazioni attivo.`)
                                    .setColor("Red")
                            ]
                        });
                    } else {
                        await valutazione.deleteMany({
                            GuildID: interaction.guild.id
                        });

                        const embed = new EmbedBuilder()
                            .setDescription(`💼 Valutazioni **disattivato** correttamente.`)
                            .setColor("#e1c4ff")

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
            /*
        case 'confess':
            const confessdata = await confessschema.findOne({ Guild: interaction.guild.id });
            try {
                if (!confessdata)
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`Non hai un sistema per le confessioni attivo.`)
                                .setColor("Red")
                        ]
                    });

                else {
                    await confessschema.deleteMany({ Guild: interaction.guild.id });

                    const embed = new EmbedBuilder()
                        .setDescription(`🗣️ Confessioni **disattivato** correttamente.`)
                        .setColor("#e1c4ff")

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
            */
        }
    }
}