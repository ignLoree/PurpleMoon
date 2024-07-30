const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const gifOptions = {
    slap: [
        'https://media.tenor.com/eU5H6GbVjrcAAAAC/slap-jjk.gif',
        'https://media.tenor.com/CAesvxP0KyEAAAAd/shinobu-kocho-giyuu-tomioka.gif',
        'https://media.tenor.com/V2aQ-PeFwwUAAAAd/slap.gif',
        'https://media.tenor.com/Irk80uToJA0AAAAC/slap-anime.gif',
        'https://media.tenor.com/V2aQ-PeFwwUAAAAd/slap.gif'
    ],
    cry: [
        'https://media.tenor.com/pqXmHpbIy0MAAAAd/anime-anime-hug.gif',
        'https://media.tenor.com/p8ooeK3t2MMAAAAC/cry-animecry.gif',
        'https://media.tenor.com/IfgSlEtSA0wAAAAC/midoriya-cry-deku-cry.gif',
        'https://media.tenor.com/j4iALzgdHEYAAAAC/alone-cry.gif',
        'https://media.tenor.com/6qJBThILOTcAAAAC/shikimoris-not-just-cute-shikimori.gif'
    ],
    blush: [
        'https://media.tenor.com/yAM097mHhCQAAAAC/1.gif',
        'https://media.tenor.com/MZ-ZPoCtw6cAAAAC/my-clueless-first-friend-jijou-wo-shiranai-tenkousei-ga-guigui-kuru.gif',
        'https://media.tenor.com/73k5d_LqL2IAAAAC/blushing-anime-anime-girl.gif',
        'https://media.tenor.com/6fbroCsDn4oAAAAC/cute-anime.gif',
        'https://media.tenor.com/LeG6BgV5ZPEAAAAC/hachioji-naoto-naoto.gif'
    ],
    kick: [
        'https://media.tenor.com/fGSyYSbD0-4AAAAC/mikey-mickey.gif',
        'https://media.tenor.com/4zwRLrLMGm8AAAAC/chifuyu-chifuyu-kick.gif',
        'https://media.tenor.com/b6g4NyJ9e08AAAAC/mazinger-z-devila-x1.gif',
        'https://media.tenor.com/xZtJVhHJGWEAAAAC/kick-kicking.gif',
        'https://media.tenor.com/g716fdX69mQAAAAd/the-god-of-highschool-anime.gif'

    ],
    kiss: [
        'https://media.tenor.com/_vI2MlAN-EUAAAAC/anime-couple-kiss-cheek.gif',
        'https://media.tenor.com/OjcDtiEDUvMAAAAC/friendly-kiss.gif',
        'https://media.tenor.com/4Z5a0xqgXAUAAAAC/anime-kiss.gif',
        'https://media.tenor.com/zfY6muV_5OoAAAAC/cr-curiositly.gif',
        'https://media.tenor.com/Cchd6VOMDIwAAAAM/forehead-forehead-kiss.gif'
    ],
    hug: [
        'https://media.tenor.com/0tqXzdcrGeoAAAAC/oi.gif',
        'https://media.tenor.com/cGFtCNuJE6sAAAAC/anime-aesthetic.gif',
        'https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif',
        'https://media.tenor.com/rTKIBe2qtxsAAAAC/anime-couples.gif',
        'https://media.tenor.com/gqC-f_diA9EAAAAC/jujutsu-kaisen-hug.gif'
    ]
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('interazione')
        .setDescription('Interagisci con qualcuno usando una gif!')
        .addUserOption(option => option.setName('user').setDescription(`L'utente con cui vuoi interagire`).setRequired(true))
        .addStringOption(option => option.setName('azione').setDescription(`L'interazione che vuoi eseguire`).setRequired(true)
            .addChoices(
                { name: 'Schiaffo', value: 'slap' },
                { name: 'Calcio', value: 'kick' },
                { name: 'Bacio', value: 'kiss' },
                { name: 'Abbraccio', value: 'hug' },
                { name: 'Pianto', value: 'cry' },
                { name: 'Vergogna', value: 'blush' },
            )
        )
        .addStringOption(option => option.setName('messaggio').setDescription("Lascia un messaggio").setRequired(false)),

    async execute(interaction) {
        const sender = interaction.user;
        const receiver = interaction.options.getUser('user');
        const action = interaction.options.getString('azione');
        const messaggio = interaction.options.getString('messaggio');

        try {
            if (!receiver) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Perfavore menziona un utente valido.')
                            .setColor("Red")
                    ]
                });
            }

            if (!gifOptions[action]) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Azione non valida. Per favore scegli una azione valida dalla lista.')
                            .setColor("Red")
                    ]
                });
            }

            const randomGif = gifOptions[action][Math.floor(Math.random() * gifOptions[action].length)];

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`${sender} ${action}ed ${receiver}!`)
                .setImage(randomGif)

            if (messaggio) {
                embed.addFields(
                    {
                        name: `\u200b`,
                        value: `${messaggio}`
                    }
                )
            }
            interaction.reply({ embeds: [embed] });
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
    }
}