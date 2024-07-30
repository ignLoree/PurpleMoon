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
            if (message.content.includes("<@746463778765406218>") || message.content === ("Blu") || message.content === ("blu")) {
                message.react('<:PM_pepecryCoffee:1209433849449283594>')
                    .then(() => message.react('<:PM_PepeCoffee:1209433852838154333>'))
                    .then(() => message.react('<:PM_pepe_coffe:1226611453423784100>'))
            }
        } catch (error) {
            console.error(error);
        }
    },
};