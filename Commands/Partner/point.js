const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const PartnershipCount = require('../../Schemas/Partner/partnerSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('partner')
        .setDescription('Manage partnership points')
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
                .setName('modifypoint')
                .setDescription('Modify partnership points')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('add')
                        .setDescription('Add user\'s partner point')
                        .addIntegerOption(option =>
                            option.setName('amount')
                                .setDescription('Amount to be added')
                                .setRequired(true)
                        )
                        .addUserOption(option =>
                            option.setName('user')
                                .setDescription('Target user')
                                .setRequired(true)
                        )
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('remove')
                        .setDescription('Remove user\'s partner point')
                        .addIntegerOption(option =>
                            option.setName('amount')
                                .setDescription('Amount to be remove')
                                .setRequired(true)
                        )
                        .addUserOption(option =>
                            option.setName('user')
                                .setDescription('Target user')
                                .setRequired(true)
                        )
                )
        ),

    async execute(interaction) {
        const subcommandGroup = interaction.options.getSubcommandGroup();
        const sub = interaction.options.getSubcommand();
        const utentee = interaction.options.getUser('user');
        const quantità = interaction.options.getInteger('amount');
        const author = utentee.id;
        let partnershipCount = await PartnershipCount.findOne({ author });
        const userRoles = interaction.member.roles.cache;
        const allowedRoles = [
            '1143622365448765551'
        ];

        const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role.id));
        if (!hasAllowedRole) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Non hai il permesso per fare questo comando!')
                        .setColor('Red')
                ]
            });
        }

        switch (sub) {

            case 'add':
                try {
                    if (!partnershipCount) {
                        partnershipCount = new PartnershipCount({ author, count: 0 });
                    }

                    partnershipCount.count += quantità
                    partnershipCount.save()

                    const embed = new EmbedBuilder()
                        .setColor('#e1c4ff')
                        .setDescription(`✅ **Success**: Added \`${quantità}\` point(s) manually to ${utentee.tag}. New Total: \`${partnershipCount.count}\` `)
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
                        .setTimestamp()

                    await interaction.reply({ embeds: [embed] })
                } catch (error) {
                    console.error(error);
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Errore durante l'esecuzione del comando.")
                                .setColor('Red')
                        ]
                    });
                }
                break;

            case 'remove':
                try {
                    if (!partnershipCount) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription("Questo utente non ha alcun punto.")
                                    .setColor('Red')
                            ]
                        });
                    }
                    
                    if (partnershipCount.count < quantità) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Questo utente ha meno punti di quelli che stai cercando di rimuovere.')
                                    .setColor('Red')
                            ]
                        });
                    }
            
                    partnershipCount.count -= quantità;
                    partnershipCount.save();
            
                    const embed = new EmbedBuilder()
                        .setColor('#e1c4ff')
                        .setDescription(`✅ **Success**: Removed \`${quantità}\` point(s) manually from ${utentee.tag}. New Total: \`${partnershipCount.count}\` `)
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` })
                        .setTimestamp();
            
                    await interaction.reply({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription("Errore durante l'esecuzione del comando.")
                                .setColor('Red')
                        ]
                    });
                }
                break;
        }
    }
}