const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,

    async execute(message) {
        if (message.channel.id !== '1142078901892427836' &&
            message.channel.id !== '1142079057178140702' &&
            message.channel.id !== '1193671297713053756' &&
            message.channel.id !== '1192542139826053323' &&
            message.channel.id !== '1202944178053455933')
            return;
        if (message.author.bot) return;
        
        try {
            if (message.content.includes("<@295500038401163264>") || message.content === ("lore") || message.content === ("Lore") || message.content === ("Lorenzo") || message.content === ("lorenzo")) {
                message.react('<a:PM_clown:1213529342601207879>')
                    .then(() => message.react('<:PM_love_mew:1218225771290820660>'))
                    .then(() => message.react('<:PM_Pepe_Punch:1211306942518009917>'))
            }
            if (message.content.includes("<@1150026316490485800>") || message.content === ("Gabry") || message.content === ("gabry")) {
                message.react('<a:PM_BlueCrown:1219795787303616602>')
                .then(() => message.react('<a:PM_Explode:1020420712244187226>'))
            }
        } catch (error) {
            console.error(error);
        }
    },
};