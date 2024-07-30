const client = require('../index')

const SERVER_ID = '925356691028070421';
const CHANNEL_ID = '1246045807170424832';

const ROLE_EMOJIS = {
    '1203321216962662480': { emoji: '<:PM_EventCreator:1246046502653263882> ', number: '∞' },
    '1203324551128416318': { emoji: '<:PM_EventManager:1246046504221937744>', number: '2' },
}

const STAFF_ROLES_ID = Object.keys(ROLE_EMOJIS);

module.exports = {
    name: 'guildMemberUpdate',
    async execute(membroVecchio, membroNuovo) {

        if (membroNuovo.guild.id !== SERVER_ID) return;

        const ruoliAggiunti = membroNuovo.roles.cache.difference(membroVecchio.roles.cache);
        const ruoliRimossi = membroVecchio.roles.cache.difference(membroNuovo.roles.cache);

        const ruoliDiStaffAggiunti = ruoliAggiunti.filter(ruolo => STAFF_ROLES_ID.includes(ruolo.id));
        const ruoliDiStaffRimossi = ruoliRimossi.filter(ruolo => STAFF_ROLES_ID.includes(ruolo.id));

        if (ruoliDiStaffAggiunti.size > 0 || ruoliDiStaffRimossi.size > 0) {
            await aggiornaListaEvent();
        }
    }
};

async function aggiornaListaEvent() {
    const guild = client.guilds.cache.get(SERVER_ID);
    if (!guild) return console.error('Server non trovato');

    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (!channel) return console.error('Canale non trovato');

    const messages = await channel.messages.fetch({ limit: 100 });
    const lastMessage = messages.find(message => message.author.id === client.user.id && message.content.includes("2/2"));

    const staffListContent = await generateEventListContent(guild);

    if (lastMessage) {
        await lastMessage.edit(staffListContent);
    } else {
        await channel.send(staffListContent);
    }
}

async function generateEventListContent(guild) {
    const staffRoleIds = Object.keys(ROLE_EMOJIS).reverse();

    let staffListContent = '';

    for (const roleId of staffRoleIds) {
        const role = guild.roles.cache.get(roleId);
        if (!role) continue;

        const staffMembers = guild.members.cache.filter(member => member.roles.cache.has(roleId));
        const member_count = staffMembers.size;
        const { emoji, number } = ROLE_EMOJIS[roleId];
        const staffMembersList = staffMembers.map(member => `<a:PM_Arrow:1240704950103969927> <@${member.id}>`).join('\n') || '<a:PM_Arrow:1240704950103969927>';

        staffListContent += `${emoji}・**<@&${roleId}>︲\`${member_count}/${number}\`**\n\n${staffMembersList}\n\n`;
    }

    return staffListContent;
}