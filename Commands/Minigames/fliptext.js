const { SlashCommandBuilder } = require ("discord.js");

const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
const OFFSET = '!'.charCodeAt(0);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fliptext')
        .setDescription(`Rovescia il testo`)
        .addStringOption(option => option.setName('testo').setDescription('Il testo da rovesciare').setRequired(true)),
    async execute(interaction) {

        let text = interaction.options.getString("testo");
        interaction.reply({ content: text.split('').map(c => c.charCodeAt(0) - OFFSET).map(c => mapping[c] || ' ').reverse().join('') })

    }

}