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
            if (message.content.includes("<@610531025470095390>")) {
                message.react('<:PM_nu_uh:1219789293472579634>')
                    .then(() => message.react('<:PM_puma:1219789290310209597>'))
                    .then(() => message.react('<:PM_casual:1219789287868858468>'))
                    .then(() => message.react('<:PM_pascal:1219789285465784402>'))
                    .then(() => message.react('<:PM_ban:1219789284119281724>'))
            }
        } catch (error) {
            console.error(error);
        }
    },
};