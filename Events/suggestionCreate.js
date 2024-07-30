const { EmbedBuilder, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const suggestion = require('../Schemas/Suggestion/suggestionSchema.js');
const formatResults = require('../Utils/formatResults.js');
const client = require('../index');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.guild) return;
        if (!interaction.message) return;
        if (!interaction.isButton) return;

        const data = await suggestion.findOne({ GuildID: interaction.guild.id, Msg: interaction.message.id });
        if (!data) return;
        const message = await interaction.channel.messages.fetch(data.Msg);

        if (interaction.customId == 'upv') {
            if (data.Upmembers.includes(interaction.user.id)) return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Non puoi votare di nuovo! Hai già votato per questo suggerimento')
                        .setColor('Red')
                ],
                ephemeral: true
            });

            let Downvotes = data.downvotes;
            if (data.Downmembers.includes(interaction.user.id)) {
                Downvotes = Downvotes - 1;
            }

            if (data.Downmembers.includes(interaction.user.id)) {

                data.downvotes = data.downvotes - 1;
            }

            data.Upmembers.push(interaction.user.id);
            data.Downmembers.pull(interaction.user.id);

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields({ name: `<:PM_up:1240578881724088323> `, value: `> **${data.upvotes + 1}** Voti`, inline: true }, { name: `<:PM_down:1240578945049694218>`, value: `> **${Downvotes}** Voti`, inline: true }, { name: `Voti`, value: formatResults(data.Upmembers, data.Downmembers) });

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

            await interaction.update({ embeds: [newEmbed], components: [button, button2] });

            data.upvotes++;
            data.save();
        }

        if (interaction.customId == 'downv') {

            if (data.Downmembers.includes(interaction.user.id)) return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Non puoi votare di nuovo! Hai già votato per questo suggerimento')
                        .setColor('Red')
                ],
                ephemeral: true
            });

            let Upvotes = data.upvotes;
            if (data.Upmembers.includes(interaction.user.id)) {
                Upvotes = Upvotes - 1;
            }

            if (data.Upmembers.includes(interaction.user.id)) {

                data.upvotes = data.upvotes - 1;
            }

            data.Downmembers.push(interaction.user.id);
            data.Upmembers.pull(interaction.user.id);

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setFields({ name: `<:PM_up:1240578881724088323>`, value: `> **${Upvotes}** Voti`, inline: true }, { name: `<:PM_down:1240578945049694218>`, value: `> **${data.downvotes + 1}** Voti`, inline: true }, { name: `Voti`, value: formatResults(data.Upmembers, data.Downmembers) });

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

            await interaction.update({ embeds: [newEmbed], components: [button, button2] });

            data.downvotes++;
            data.save();
        }

        if (interaction.customId == 'totalvotes') {

            let upvoters = [];
            await data.Upmembers.forEach(async member => {
                upvoters.push(`<@${member}>`)
            });

            let downvoters = [];
            await data.Downmembers.forEach(async member => {
                downvoters.push(`<@${member}>`)
            });

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .addFields({ name: `<:PM_up:1240578881724088323>  (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) || ` Nessun voto!`}`, inline: true })
                .addFields({ name: `<:PM_down:1240578945049694218> (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) || ` Nessun voto!`}`, inline: true })

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'totalvotes2') {

            let upvoters = [];
            await data.Upmembers.forEach(async member => {
                upvoters.push(`<@${member}>`)
            });

            let downvoters = [];
            await data.Downmembers.forEach(async member => {
                downvoters.push(`<@${member}>`)
            });

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .addFields({ name: `<:PM_up:1240578881724088323> (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) || ` Nessun voto!`}`, inline: true })
                .addFields({ name: `<:PM_down:1240578945049694218> (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) || ` Nessun voto!`}`, inline: true })

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'totalvotes3') {

            let upvoters = [];
            await data.Upmembers.forEach(async member => {
                upvoters.push(`<@${member}>`)
            });

            let downvoters = [];
            await data.Downmembers.forEach(async member => {
                downvoters.push(`<@${member}>`)
            });

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .addFields({ name: `<:PM_up:1240578881724088323>  (${upvoters.length})`, value: `> ${upvoters.join(', ').slice(0, 1020) || `> Nessun voto!`}`, inline: true })
                .addFields({ name: `<:PM_down:1240578945049694218> (${downvoters.length})`, value: `> ${downvoters.join(', ').slice(0, 1020) || `> Nessun voto!`}`, inline: true })

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'appr') {

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Solo lo staff può usare questo bottone.')
                        .setColor('Red')
                ], ephemeral: true
            });

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setColor('Green').addFields({ name: '\u200B', value: '<:PM_yes:1240579086825422848> Il tuo suggerimento è stato approvato!' })
            const newButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('upv')
                        .setEmoji('<:PM_up:1240578881724088323> ')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                        .setCustomId('downv')
                        .setEmoji('<:PM_down:1240578945049694218>')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                        .setCustomId('totalvotes2')
                        .setEmoji('<:PM_app:1240579272981348353>')
                        .setStyle(ButtonStyle.Secondary)
                );
            await interaction.update({ embeds: [newEmbed], components: [newButton] });
        }

        if (interaction.customId == 'rej') {

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Solo lo staff può usare questo bottone')
                        .setColor('Red')
                ], ephemeral: true
            });

            const newEmbed = EmbedBuilder.from(message.embeds[0]).setColor('Red').addFields({ name: '\u200B', value: '<:PM_no:1240579035202060370> Il tuo suggerimento è stato rifiutato!' })
            const newButton2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('upv')
                        .setEmoji('<:PM_up:1240578881724088323> ')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                        .setCustomId('downv')
                        .setEmoji('<:PM_down:1240578945049694218>')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                        .setCustomId('totalvotes3')
                        .setEmoji('<:PM_app:1240579272981348353>')
                        .setStyle(ButtonStyle.Secondary)
                );
            await interaction.update({ embeds: [newEmbed], components: [newButton2] });
        }
    }
}