const {
    Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, Partials, ActivityType, Activity, AuditLogEvent, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType
} = require(`discord.js`);
const fs = require('fs');

let client;
try {
    client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.AutoModerationConfiguration,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildWebhooks
        ], partials: [
            Partials.Message,
            Partials.Channel,
            Partials.Reaction,
            Partials.User,
            Partials.GuildMember,
            Partials.GuildScheduledEvent,
            Partials.ThreadMember
        ]
    })
} catch (error) {
    console.error(`${color.red}[${getTimestamp()}]${color.reset} [ERROR] Error while creating the client. \n${color.red}[${getTimestamp()}]${color.reset} [ERROR]`, error);
};

client.logs = require('./Utils/logs');
client.config2 = require('./config.js');
client.config = require('./config.json')

const Logs = require('discord-logs');

client.on("ready", async (client) => {
    try {
        client.user.setActivity({
            type: ActivityType.Custom,
            name: "irrelevant",
            state: `🌙💜 discord.gg/purplemoon`
        })
    } catch (error) {
        client.logs.error(`[STATUS] Error while loading status.`);
    };
});

client.on("ready", () => {
    try {
        client.user.setStatus(client.config2.status);
        client.logs.success(`[STATUS] Bot status loaded as ${client.config2.status}.`);
    } catch (error) {
        client.logs.error(`[STATUS] Error while loading bot status.`);
    };
});

require('./Handlers/processHandler')();

client.commands = new Collection();
client.pcommands = new Collection();
client.aliases = new Collection();

const functions = fs.readdirSync("./Handlers").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./Events").filter(file => file.endsWith(".js"));
const triggerFiles = fs.readdirSync("./Triggers").filter(file => file.endsWith(".js"));
const pcommandFolders = fs.readdirSync('./Prefix');
const commandFolders = fs.readdirSync("./Commands");

(async () => {
    for (file of functions) {
        require(`./Handlers/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./Events");
    client.handleTriggers(triggerFiles, "./Triggers")
    client.handleCommands(commandFolders, "./Commands");
    client.prefixCommands(pcommandFolders, './Prefix');
    client.login(client.config.token).catch((error) => {
        console.error(`${color.red}[${getTimestamp()}]${color.reset} [LOGIN] Error while logging in. Check if your token is correct or double check your also using the correct intents. \n${color.red}[${getTimestamp()}]${color.reset} [LOGIN]`, error);
    });
})();

const color = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;202m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    pink: '\x1b[38;5;213m',
    torquise: '\x1b[38;5;45m',
    purple: '\x1b[38;5;57m',
    reset: '\x1b[0m'
}

function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction) return;
    if (!interaction.isChatInputCommand()) return;
    else {
        try {

            const channel = await client.channels.cache.get(client.config2.slashCommandLoggingChannel);
            const server = interaction.guild.name;
            const user = interaction.user.username;
            const userID = interaction.user.id;

            const embed = new EmbedBuilder()
                .setColor(client.config2.embedColor)
                .setAuthor({ name: `${user} has used a command.`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTitle(`${client.user.username} Command Logger`)
                .addFields({ name: 'Server Name', value: `${server}` })
                .addFields({ name: 'Command', value: `\`\`\`${interaction}\`\`\`` })
                .addFields({ name: 'User', value: `${user} | ${userID}` })
                .setTimestamp()
                .setFooter({ text: `Command Logger ${client.config2.devBy}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })

            await channel.send({ embeds: [embed] });
        } catch (error) {
            client.logs.error(`[SLASH_COMMAND_USED] Error while logging command usage. Check if you have the correct channel ID in your config.`);
        }
    };
});

client.on(Events.MessageCreate, async message => {

    const prefix = client.config2.prefix
    if (!message.author.bot && message.content.startsWith(prefix)) {
        try {

            const channel = await client.channels.cache.get(client.config2.prefixCommandLoggingChannel);
            const server = message.guild.name;
            const user = message.author.username;
            const userID = message.author.id;

            const embed = new EmbedBuilder()
                .setColor(client.config2.embedColor)
                .setAuthor({ name: `${user} has used a command.`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTitle(`${client.user.username} Command Logger`)
                .addFields({ name: 'Server Name', value: `${server}` })
                .addFields({ name: 'Command', value: `\`\`\`${message.content}\`\`\`` })
                .addFields({ name: 'User', value: `${user} | ${userID}` })
                .setTimestamp()
                .setFooter({ text: `Command Logger ${client.config2.devBy}`, iconURL: message.author.avatarURL({ dynamic: true }) })

            await channel.send({ embeds: [embed] });
        } catch (error) {
            client.logs.error(`[PREFIX_COMMAND_USED] Error while logging command usage. Check if you have the correct channel ID in your config.`);
        }
    };
});

client.on('guildBanAdd', (ban) => {
    const logchannel = ban.guild.channels.cache.find(channel => channel.id === '1143521364448399430');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setAuthor({ name: 'Utente Bannato', iconURL: ban.user.displayAvatarURL() })
        .setDescription(`${ban.user} ${ban.user.tag}\n \u200b`)
        .setFooter({ text: `ID: ${ban.user.id}` })
        .setTimestamp()
        .setThumbnail(ban.user.displayAvatarURL())

    logchannel.send({ embeds: [embed] });
});

client.on('guildBanRemove', (ban) => {
    const logchannel = ban.guild.channels.cache.find(channel => channel.id === '1143521364448399430');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setAuthor({ name: 'Utente Sbannato', iconURL: ban.user.displayAvatarURL() })
        .setDescription(`${ban.user} ${ban.user.tag}\n \u200b`)
        .setFooter({ text: `ID: ${ban.user.id}` })
        .setTimestamp()
        .setThumbnail(ban.user.displayAvatarURL())

    logchannel.send({ embeds: [embed] });
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    if (oldChannel.name == newChannel.name) return;

    const logchannel = newChannel.guild.channels.cache.find(channel => channel.id === '1222859360401883137');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setTitle('Canale Modificato')
        .setDescription(`${newChannel} è stato cambiato:\n\nNome cambiato: **#${oldChannel.name}** -> **#${newChannel.name}**`)
        .setTimestamp()
        .setFooter({ text: `ID: ${newChannel.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] })
})

client.on('channelDelete', async oldChannel => {

    const logchannel = oldChannel.guild.channels.cache.find(channel => channel.id === '1222859360401883137');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setDescription(`**Canale Cancellato: #${oldChannel.name}**`)
        .setAuthor({ name: `${oldChannel.guild.name}`, iconURL: oldChannel.guild.iconURL() })
        .setFooter({ text: `ID: ${oldChannel.id}` })
        .setTimestamp()
        .setColor("#e1c4ff")

    logchannel.send({ embeds: [embed] })
});

client.on('emojiDelete', async emoji => {

    const logchannel = emoji.guild.channels.cache.find(channel => channel.id === '1215081335140384788');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setDescription(`L'emoji \`:${emoji.name}:\` è stata cancellata!`)
        .setTitle('Emoji Cancellata')
        .setThumbnail(emoji.imageURL())
        .setFooter({ text: `ID: ${emoji.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] });
});

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    if (oldEmoji.name === newEmoji.name) return;

    const logchannel = newEmoji.guild.channels.cache.find(channel => channel.id === '1215081335140384788');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setDescription(`\`:${oldEmoji.name}:\` was changed to \`:${newEmoji.name}:\``)
        .setTitle('Emoji Updated')
        .setThumbnail(newEmoji.imageURL())
        .setFooter({ text: `ID: ${newEmoji.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] });
});

client.on('emojiCreate', async emoji => {

    const logchannel = emoji.guild.channels.cache.find(channel => channel.id === '1215081335140384788');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setDescription(`L'emoji \`:${emoji.name}:\` è stata creata!`)
        .setTitle('Emoji Created')
        .setThumbnail(emoji.imageURL())
        .setFooter({ text: `ID: ${emoji.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] });
});

client.on('stickerCreate', async sticker => {

    const logchannel = sticker.guild.channels.cache.find(channel => channel.id === '1215081335140384788');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setDescription(`L'emoji \`:${sticker.name}:\` è stata creata!`)
        .setTitle('Sticker Created')
        .setFooter({ text: `ID: ${sticker.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] });
});

client.on('stickerUpdate', async (oldSticker, newSticker) => {
    if (oldSticker.name === newSticker.name) return;

    const logchannel = newSticker.guild.channels.cache.find(channel => channel.id === '1215081335140384788');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setDescription(`\`:${oldSticker.name}:\` was changed to \`:${newSticker.name}:\``)
        .setTitle('Sticker Updated')
        .setFooter({ text: `ID: ${newSticker.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] });
});

client.on('stickerDelete', async sticker => {

    const logchannel = sticker.guild.channels.cache.find(channel => channel.id === '1215081335140384788');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("#e1c4ff")
        .setDescription(`L'emoji \`:${sticker.name}:\` è stata cancellata!`)
        .setTitle('Sticker Cancellato')
        .setFooter({ text: `ID: ${sticker.id}` })
        .setTimestamp()

    logchannel.send({ embeds: [embed] });
});

client.on('inviteCreate', async invite => {
    if (!invite.guild) return;

    const logChannel = invite.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
    if (!logChannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('#e1c4ff')
        .setFooter({ text: `Autore: ${invite.inviter.id}` })
        .setAuthor({ name: `${invite.inviter.tag}`, iconURL: invite.inviter.displayAvatarURL() })
        .addFields(
            { name: 'Codice Invito', value: invite.code, inline: true },
            { name: 'Creato da', value: invite.inviter ? `<@${invite.inviter.id}>` : 'Sconosciuto', inline: true },
            { name: 'Canale', value: invite.channel ? `<#${invite.channel.id}>` : 'Sconosciuto', inline: true },
            { name: 'Scadenza', value: invite.expiresTimestamp ? new Date(invite.expiresTimestamp).toString() : 'Mai', inline: true },
            { name: 'Massimo usi', value: invite.maxUses.toString(), inline: true }
        )
        .setTimestamp()

    logChannel.send({ embeds: [embed] }).catch(console.error);
});

client.on('inviteDelete', async invite => {
    if (!invite.guild || !invite.inviter) return;

    const guild = invite.guild;
    const inviter = await guild.members.fetch(invite.inviter.id);

    const logChannel = invite.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
    if (!logChannel) {
        console.error('Canale log non trovato.');
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('#e1c4ff')
        .setFooter({ text: `Autore: ${inviter.user.id}` })
        .setAuthor({ name: `${inviter.user.tag}`, iconURL: inviter.user.displayAvatarURL() })
        .addDescription(`L'invito ${invite.code} è stato cancellato`)
        .setTimestamp();

    logChannel.send({ embeds: [embed] }).catch(console.error);
});

client.on('messageDelete', (message) => {
    try {
        if (!message || !message.author) {
            return;
        }
        const logChannel = message.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
        if (!logChannel) {
            console.error('Canale log non trovato.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setTimestamp()
            .setFooter({ text: `Autore: ${message.author.id} | ID Messaggio: ${message.id}` })
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`**Messaggio inviato da ${message.author} Cancellato in ${message.channel}**\n${message.content || '*Nessun contenuto*'}`)
            .setImage(message?.attachments?.first()?.url)

        logChannel.send({ embeds: [embed] });
    } catch (err) {
        console.error(err);
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    try {
        if (oldMessage.content == newMessage.content) return;
        if (newMessage.content.length > 500) return;

        const logChannel = newMessage.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
        if (!logChannel) {
            console.error('Canale log non trovato.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${newMessage.author.tag}`, iconURL: newMessage.author.displayAvatarURL() })
            .setDescription(`**Messaggio modificato in ${newMessage.channel}** [Vai al messaggio](${newMessage.url})`)
            .addFields(
                { name: `Prima`, value: `${oldMessage.content || '*Nessun contenuto*'}` },
                { name: `Dopo`, value: `${newMessage.content || '*Nessun contenuto*'}` }
            )
            .setFooter({ text: `User ID: ${newMessage.author.id}` })
            .setTimestamp()

        logChannel.send({ embeds: [embed] });
    } catch (err) {
        console.error(err);
    }
});

client.on('channelPinsUpdate', (channel) => {
    try {
        if (!channel) {
            return;
        }
        const logChannel = channel.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
        if (!logChannel) {
            console.error('Canale log non trovato.');
            return;
        }

        channel.messages.fetchPinned()
            .then(messages => {
                messages.forEach(pinnedMessage => {
                    if (pinnedMessage.pinned) {
                        const embed = new EmbedBuilder()
                            .setColor("#e1c4ff")
                            .setTimestamp()
                            .setFooter({ text: `Autore: ${pinnedMessage.author.id} | ID Messaggio: ${pinnedMessage.id}` })
                            .setAuthor({ name: `${pinnedMessage.author.tag}`, iconURL: pinnedMessage.author.displayAvatarURL() })
                            .setDescription(`**Messaggio inviato da ${pinnedMessage.author} pinnato in ${pinnedMessage.channel}**\n${pinnedMessage.content || '*Nessun contenuto*'}`)
                            .setImage(pinnedMessage?.attachments?.first()?.url)

                        logChannel.send({ embeds: [embed] });
                    } else if (pinnedMessage.unpinned) {
                        const embed = new EmbedBuilder()
                            .setColor("#e1c4ff")
                            .setTimestamp()
                            .setFooter({ text: `Autore: ${pinnedMessage.author.id} | ID Messaggio: ${pinnedMessage.id}` })
                            .setAuthor({ name: `${pinnedMessage.author.tag}`, iconURL: pinnedMessage.author.displayAvatarURL() })
                            .setDescription(`**Messaggio inviato da ${pinnedMessage.author} non più pinnato in ${pinnedMessage.channel}**\n${pinnedMessage.content || '*Nessun contenuto*'}`)
                            .setImage(pinnedMessage?.attachments?.first()?.url)

                        logChannel.send({ embeds: [embed] });
                    }
                })
            })
    } catch (err) {
        console.error(err);
    }
});

client.on('messageDeleteBulk', async messages => {
    try {
        if (!messages || !messages.author) {
            return;
        }
        const logChannel = messages.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
        if (!logChannel) {
            console.error('Canale log non trovato.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${messages.first().guild.name}`, iconURL: messages.first().guild.iconURL() })
            .setTimestamp()
            .setDescription(`**Messaggi cancellati in blocco in ${messages.first().channel}, ${messages.size} messaggi cancellati**`)

        logChannel.send({ embeds: [embed] });
    } catch (err) {
        console.error(err);
    }
});

client.on('messageDelete', async message => {
    if (message.mentions.users.size > 0 && Date.now() - message.createdTimestamp < 5000) {
        const logChannel = message.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
        if (!logChannel) {
            console.error('Canale log non trovato.');
            return;
        }
        let executor = 'Sconosciuto';
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete
        }).catch(console.error);

        const deletionLog = fetchedLogs?.entries.first();
        if (deletionLog && deletionLog.extra.channel.id === message.channel.id
            && deletionLog.target.id === message.author.id
            && deletionLog.createdTimestamp > message.createdTimestamp) {
            executor = deletionLog.executor.tag;
        } else {
            executor = message.author.tag + '(Lui stesso)';
        }
        const embed = new EmbedBuilder()
            .setColor('#e1c4ff')
            .setFooter({ text: `Autore: ${message.author.id} | ID Messaggio: ${message.id}` })
            .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`**Messaggio inviato da ${message.author} Cancellato in ${message.channel}**\n${message.content || '*Nessun contenuto*'}`)
            .addFields(
                { name: 'Cancellato da', value: executor, inline: true }
            )
            .setTimestamp()
            .setImage(message?.attachments?.first()?.url)

        logChannel.send({ embeds: [embed] }).catch(console.error);
    }
});

client.on('roleCreate', (role) => {
    try {
        const logchannel = role.guild.channels.cache.find(channel => channel.id === '1222859360401883137');
        if (!logchannel) {
            console.error('Canale log non trovato.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${role.guild.name}`, iconURL: role.guild.iconURL() })
            .setDescription(`**Ruolo Creato: ${role.name}**`)
            .setFooter({ text: `ID: ${role.id}` })
            .setTimestamp()

        logchannel.send({ embeds: [embed] });
    } catch (err) {
        console.error(err);
    }
});

client.on('roleDelete', (role) => {
    try {
        const logchannel = role.guild.channels.cache.find(channel => channel.id === '1222859360401883137');
        if (!logchannel) {
            console.error('Canale log non trovato.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${role.guild.name}`, iconURL: role.guild.iconURL() })
            .setDescription(`**Ruolo Cancellato: ${role.name}**`)
            .setFooter({ text: `ID: ${role.id}` })
            .setTimestamp()

        logchannel.send({ embeds: [embed] });
    } catch (err) {
        console.error(err);
    }
});

client.on('roleUpdate', (oldRole, newRole) => {
    try {
        if (oldRole?.color === newRole?.color) return;

        const logchannel = newRole.guild.channels.cache.find(channel => channel.id === '1222859360401883137');
        if (!logchannel) {
            console.error('Canale log non trovato.');
            return;
        }

        if (newRole.color === 0) {
            newRole.color = "000000"
        }

        if (oldRole.color === 0) {
            oldRole.color = "000000"
        }

        const embed = new EmbedBuilder()
            .setColor(`#${newRole.color.toString(16)}`)
            .setAuthor({ name: `${newRole.guild.name}`, iconURL: newRole.guild.iconURL() })
            .setDescription(`**Colore Ruolo Modificato: #${oldRole.color.toString(16)} > #${newRole.color.toString(16)}**`)
            .setFooter({ text: `ID: ${newRole.id}` })
            .setTimestamp()

        logchannel.send({ embeds: [embed] });
    } catch (err) {
        console.error(err);
    }
});

client.on('roleUpdate', (oldRole, newRole) => {
    try {
        let descriptionText = '';

        const oldPerms = new PermissionsBitField(oldRole.permissions);
        const newPerms = new PermissionsBitField(newRole.permissions);
        const addedPerms = newPerms.remove(oldPerms).toArray();
        const removedPerms = oldPerms.remove(newPerms).toArray();

        if (addedPerms.length > 0 || removedPerms.length > 0) {
            descriptionText += '**Permessi:**\n';
            if (addedPerms.length > 0) {
                descriptionText += `Aggiunto: \`${addedPerms.join('`, `')}\`\n`;
            }
            if (removedPerms.length > 0) {
                descriptionText += `Rimosso: \`${removedPerms.join('`, `')}\`\n`;
            }
        }

        if (descriptionText !== '') {
            const logchannel = newRole.guild.channels.cache.find(channel => channel.id === '1222859360401883137');
            if (!logchannel) {
                console.error('Canale log non trovato.');
                return;
            }

            const embed = new EmbedBuilder()
                .setColor("#e1c4ff")
                .setTitle(`Ruolo Modificato: "${newRole.name}"`)
                .setDescription(descriptionText)
                .addFields({ name: 'ID Ruolo', value: `\`${newRole.id}\``, inline: false })
                .setTimestamp();

            logchannel.send({ embeds: [embed] })
        }
    } catch (err) {
        console.error(err);
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.channel == newState.channel) return;
    let embed;

    const logchannel = oldState.guild.channels.cache.find(channel => channel.id === '1222859088766046219');
    if (!logchannel) {
        console.error('Canale log non trovato.');
        return;
    }

    if (!oldState.channel && newState) {
        embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${newState.member.user.tag}`, iconURL: newState.member.displayAvatarURL() })
            .setDescription(`**${newState.member} è entrato nel canale ${newState.channel}**`)
            .setFooter({ text: `ID: ${newState.member.id}` })
            .setTimestamp()
    }

    if (oldState && !newState.channel) {
        embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${oldState.member.user.tag}`, iconURL: oldState.member.displayAvatarURL() })
            .setDescription(`**${oldState.member} è uscito dal canale ${oldState.channel}**`)
            .setFooter({ text: `ID: ${oldState.member.id}` })
            .setTimestamp()
    }

    if (oldState.channel && newState.channel) {
        embed = new EmbedBuilder()
            .setColor("#e1c4ff")
            .setAuthor({ name: `${oldState.member.user.tag}`, iconURL: oldState.member.displayAvatarURL() })
            .setDescription(`**${newState.member} ha cambiato canale ${oldState.channel} -> ${newState.channel}**`)
            .setFooter({ text: `ID: ${oldState.member.id}` })
            .setTimestamp()
    }

    logchannel.send({ embeds: [embed] })
});

const reactions = require('./Schemas/ReactionRole/reactionroleSchema.js')

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guildId) return;
    if (user.bot) return;

    let cID = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
    if (!reaction.emoji.id) cID = reaction.emoji.name;

    const data = await reactions.findOne({ Guild: reaction.message.guildId, Message: reaction.message.id, Emoji: cID });
    if (!data) return

    const guild = await client.guilds.cache.get(reaction.message.guildId);
    const member = await guild.members.cache.get(user.id);

    try {
        await member.roles.add(data.Role);
    } catch (e) {
        console.error(e)
        return;
    }
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (!reaction.message.guildId) return;
    if (user.bot) return;

    let cID = `<:${reaction.emoji.name}:${reaction.emoji.id}>`;
    if (!reaction.emoji.id) cID = reaction.emoji.name;

    const data = await reactions.findOne({ Guild: reaction.message.guildId, Message: reaction.message.id, Emoji: cID });
    if (!data) return

    const guild = await client.guilds.cache.get(reaction.message.guildId);
    const member = await guild.members.cache.get(user.id);

    try {
        await member.roles.remove(data.Role);
    } catch (e) {
        console.error(e)
        return;
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
});

Logs(client, {
    debug: true
});