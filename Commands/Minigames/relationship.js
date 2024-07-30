const canvafy = require("canvafy");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("relationship-checker")
    .setDMPermission(false)
    .setDescription("Mostra la probabilità che due persone siano innamorate!")
    .addUserOption(option => option.setName("user").setDescription("Il primo utente!").setRequired(true))
    .addUserOption(option => option.setName("member").setDescription("Il secondo utente!").setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getUser("user");
        const member = interaction.options.getUser("member");
        const userAvatar = user.displayAvatarURL({
            forceStatic: true,
            size: 1024,
            extension: "png",
        });
        const memberAvatar = member.displayAvatarURL({
            forceStatic: true,
            size: 1024,
            extension: "png",
        });

        const ship = await new canvafy.Ship()
        .setAvatars(userAvatar, memberAvatar)
        .setBorder("#e1c4ff")
        .setBackground(
            "image",
            "https://img.freepik.com/premium-vector/heart-cartoon-character-seamless-pattern-pink-background-pixel-style_618978-1727.jpg"
        )
        .setOverlayOpacity(0.5)
        .build();

        await interaction.reply({ content: `Probabilità per **${user.username}** & **${member.username}** di essere innamorati!`, files: [{ attachment: ship, name: `ship.png`, }] });
    },
};