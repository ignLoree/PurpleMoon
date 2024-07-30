const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js')
const reaction = require('../../Schemas/ReactionRole/reactionroleSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-roles')
        .setDescription('Usa il sistema delle reaction roles.')
        .addSubcommand(sub =>
            sub.setName('add')
                .setDescription('Aggiungi un ruolo al messaggio.')
                .addStringOption(op =>
                    op.setName('id')
                        .setDescription('L\'ID del messaggio a cui aggiungere la reazione.')
                        .setRequired(true)
                )
                .addStringOption(op =>
                    op.setName('emoji')
                        .setDescription('L\'emoji con cui deve reagire.')
                        .setRequired(true)
                )
                .addRoleOption(op =>
                    op.setName('role')
                        .setDescription('Il ruolo che deve dare quando reagisce.')
                        .setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub.setName('remove')
                .setDescription('Rimuovi un ruolo al messaggio.')
                .addStringOption(op =>
                    op.setName('id')
                        .setDescription('L\'ID del messaggio a cui aggiungere la reazione.')
                        .setRequired(true)
                )
                .addStringOption(op =>
                    op.setName('emoji')
                        .setDescription('L\'emoji con cui deve reagire.')
                        .setRequired(true)
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const { options, guild, channel } = interaction;
        const sub = options.getSubcommand()
        const emoji = options.getString('emoji')

        let e;
        const message = await channel.messages.fetch(options.getString('id')).catch(err => {
            e = err;
        })

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
            embed: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setDescription('Non hai i permessi per fare questo comando.')
            ], ephemeral: true
        })
        if (e) return await interaction.reply({
            embed: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`Sii sicuro che questo messaggio sia in questo canale: ${channel}.`)
            ], ephemeral: true
        })

        const data = await reaction.findOne({ Guild: guild.id, Message: message.id, Emoji: emoji });

        switch (sub) {
            case 'add':

                if (data) {
                    return await interaction.reply({
                        embed: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setDescription(`Hai già  una reaction attiva con questa ${emoji} su questo messaggio.`)
                        ], ephemeral: true
                    })
                } else {
                    const role = options.getRole('role');
                    await reaction.create({
                        Guild: guild.id,
                        Message: message.id,
                        Emoji: emoji,
                        Role: role.id
                    })

                    const embed = new EmbedBuilder()
                    .setColor('e1c4ff')
                    .setDescription(`Ho aggiunto la reaction role al messaggio ${message.url} con l'emoji ${emoji} e il ruolo ${role}`)

                    await message.react(emoji).catch(err => {});

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }

                break;
                case 'remove':

                if (!data) {
                    return await interaction.reply({ 
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Red')
                            .setDescription('Non esiste questa reaction role')
                        ], ephemeral: true
                    })
                } else {
                    await reaction.deleteMany({
                        Guild: guild.id,
                        Message: message.id,
                        Emoji: emoji
                    })

                    const embed = new EmbedBuilder()
                    .setColor('e1c4ff')
                    .setDescription(`Ho rimosso la reaction role al messaggio ${message.url} con l'emoji ${emoji}`)

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }
        }
    }
}