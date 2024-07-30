const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Gioca a Sasso, Carta, Forbice!")
        .addUserOption(option =>
            option.setName("avversario")
                .setDescription("L'utente contro cui vuoi giocare.")
                .setRequired(true)),

    async execute(interaction) {
        const player1 = interaction.user;
        const player2 = interaction.options.getUser("avversario");

        const choices = [
            { name: "Sasso", emoji: "🪨", beats: "Forbice" },
            { name: "Carta", emoji: "📄", beats: "Sasso" },
            { name: "Forbice", emoji: "✂️", beats: "Carta" }
        ]

        try {
            if (player1.id == player2.id) {
                await interaction.reply({ content: "Non puoi giocare contro te stesso!", ephemeral: true });
                return;
            }
            if (player2.bot) {
                await interaction.reply({ content: "Non puoi giocare contro un bot!", ephemeral: true });
                return;
            }

            const gameEmbed = new EmbedBuilder()
                .setColor("#e1c4ff")
                .setTitle("Sasso, Carta, Forbice!")
                .setDescription(`E' il turno di ${player2}.`)
                .setTimestamp(new Date())

            const buttons = choices.map((choice) => {
                return new ButtonBuilder()
                    .setLabel(choice.name)
                    .setCustomId(choice.name)
                    .setEmoji(choice.emoji)
                    .setStyle(ButtonStyle.Primary)
            })

            const gameButtons = new ActionRowBuilder()
                .addComponents(buttons)

            const game = await interaction.reply({
                content: `${player2}! Sei stato sfidatə a Sasso, Carta, Forbice da ${player1}.`,
                embeds: [gameEmbed],
                components: [gameButtons]
            });

            const player2Interaction = await game.awaitMessageComponent({
                filter: (i) => i.user.id == player2.id,
                time: 30_000
            }).catch(async (error) => {
                console.error(error);
                gameEmbed.setDescription(`Partita Finita! ${player2} non ha risposto in tempo.`);
                await game.edit({ content: "La partita è finita!", embeds: [gameEmbed], components: [] });
            });

            if (!player2Interaction) return;

            const player2Choice = choices.find((choice) => choice.name == player2Interaction.customId);

            await player2Interaction.reply({ content: `Hai scelto ${player2Choice.name + player2Choice.emoji}`, ephemeral: true });
            gameEmbed.setDescription(`E' il turno di ${player1}.`);
            await game.edit({
                content: `${player1} è il tuo turno adesso!`,
                embeds: [gameEmbed]
            });

            const player1Interaction = await game.awaitMessageComponent({
                filter: (i) => i.user.id == player1.id,
                time: 30_000
            }).catch(async (error) => {
                console.error(error);
                gameEmbed.setDescription(`Partita Finita! ${player1} non ha risposto in tempo.`);
                await game.edit({ content: "La partita è finita!", embeds: [gameEmbed], components: [] });
            })

            if (!player1Interaction) return;

            const player1Choice = choices.find((choice) => choice.name == player1Interaction.customId);

            let result;

            if (player1Choice.beats === player2Choice.name) {
                result = `${player1} ha vinto! 🙂`;
            } else if (player2Choice.beats === player1Choice.name) {
                result = `${player2} ha vinto! 🙂`;
            } else if (player1Choice.name === player2Choice.name) {
                result = "E' finita in pareggio!";
            } else {
                result = "Qualcosa è andato storto.";
            }

            gameEmbed.setDescription(`${player1} ha scelto ${player1Choice.name + player1Choice.emoji}\n${player2} ha scelto ${player2Choice.name + player2Choice.emoji}\n\n${result}`);
            game.edit({ content: "La partita è finita!", embeds: [gameEmbed], components: [] })
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
    },
};