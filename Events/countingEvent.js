const { EmbedBuilder } = require('discord.js');
const countschema = require('../Schemas/Counting/countingSchema');
const math = require('mathjs');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.guild === null) return;
        const countdata = await countschema.findOne({ Guild: message.guild.id });
        let reaction = "";

        if (!countdata) return;

        let countchannel = client.channels.cache.get(countdata.Channel);

        if (message.author.bot) return;
        if (message.channel.id !== countchannel.id) return;

        if (countdata.Count > 98) {
            reaction = '<a:PM_check_3:1240696791893147678>';
        } else if (countdata.Count > 48) {
            reaction = '<:PM_check_2:1240696748712788089>';
        } else {
            reaction = '<:PM_check:1240696685269618829>';
        }

        const regex = /^[0-9+\-*/x:() ]+$/;
        if (!regex.test(message.content)) return;

        let messageValue;
        try {
            const expression = message.content.replace(/\s+/g, '').replace(/x/g, '*').replace(/:/g, '/');
            messageValue = math.evaluate(expression);
        } catch (err) {
            return;
        }

        if (message.author.id === countdata.LastUser) {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Non puoi contare da solə! Counting perso a: **${countdata.Count}**! Tornato a **1**.`)
                        .setColor('#e1c4ff')
                ]
            });
            countdata.Count = 0;
            countdata.LastUser = ' ';

            try {
                message.react('<a:PM_cross:1240696845181648917>');
            } catch (err) {
                console.error(err);
            }
        } else {
            if (messageValue - 1 < countdata.Count && countdata.Count === 0 && message.author.id !== countdata.LastUser) {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Il **counter** è a **0** di default!`)
                            .setColor('#e1c4ff')
                    ]
                });
                message.react('<a:PM_warning:1240712074875768863>');
            } else if (messageValue - 1 < countdata.Count || messageValue === countdata.Count || messageValue > countdata.Count + 1 && message.author.id !== countdata.LastUser) {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Hai sbagliato numero! Counting perso a: **${countdata.Count}**! Tornato a **1**.`)
                            .setColor('#e1c4ff')
                    ]
                });
                countdata.Count = 0;
                try {
                    message.react('<a:PM_cross:1240696845181648917>');
                } catch (err) {
                    console.error(err);
                }
            } else if (messageValue - 1 === countdata.Count && message.author.id !== countdata.LastUser) {
                countdata.Count += 1;
                try {
                    message.react(`${reaction}`);
                } catch (err) {
                    console.error(err);
                }
                countdata.LastUser = message.author.id;
            }
        }
        countdata.save();
    }
};