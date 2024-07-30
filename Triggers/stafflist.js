const client = require('../index')

const SERVER_ID = '925356691028070421';
const CHANNEL_ID = '1143603924255899829';

const ROLE_EMOJIS = {
    '1143604206276726908': { emoji: '<:PM_PartnerManager:1240651401902690314>', number: '∞' },
    '1143622574463520910': { emoji: '<:PM_Helper:1240651416863768700>', number: '∞' },
    '1143622597498634251': { emoji: '<:PM_Mod:1240651430004654131>', number: '5' },
    '972616873021689916': { emoji: '<:PM_Coordinator:1240651424363188254>', number: '3' },
    '1197954938702139484': { emoji: '<:PM_Supervisor:1240651426556936242>', number: '4' },
    '1143622619866861579': { emoji: '<:PM_Admin:1240651442277056657>', number: '4' },
    '1143622636220448940': { emoji: '<:PM_Manager:1240651422270226453>', number: '1' },
    '1240699532988121110': { emoji: '<:PM_CoFounder:1240700239560835202>', number: '1' },
    '925387929654796320': { emoji: '<:PM_Founder:1240651444416286760>', number: '1' },
    '1143962515626279035': { emoji: '<:PM_Owner:1240651447008362616>', number: '1' },
}
const ID_LORE = {
    '925387929654796320': ['295500038401163264'],
};

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
            await aggiornaListaStaff();
        }
    }
};

async function aggiornaListaStaff() {
    const guild = client.guilds.cache.get(SERVER_ID);
    if (!guild) return console.error('Server non trovato');

    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (!channel) return console.error('Canale non trovato');

    const messages = await channel.messages.fetch({ limit: 100 });
    const lastMessage = messages.find(message => message.author.id === client.user.id && message.content.includes("1/1"));

    const staffListContent = await generateStaffListContent(guild);

    if (lastMessage) {
        await lastMessage.edit(staffListContent);
    } else {
        await channel.send(staffListContent);
    }
}

async function generateStaffListContent(guild) {
    const staffRoleIds = Object.keys(ROLE_EMOJIS).reverse();

    let staffListContent = `# **__STAFF LIST__**
<a:PM_Punto:1159603819752194099>︲La __**staff list**__ serve per sapere i __**limiti di ogni ruolo**__, per capire __**quanti staffer ci sono**__ e per poter capire a chi __**chiedere assistenza**__.\n\n`;

    for (const roleId of staffRoleIds) {
        const role = guild.roles.cache.get(roleId);
        if (!role) continue;

        const staffMembers = guild.members.cache.filter(member => member.roles.cache.has(roleId));

        const excludedMembers = ID_LORE[roleId] || [];
        const filteredMembers = staffMembers.filter(member => !excludedMembers.includes(member.id));

        const member_count = filteredMembers.size;
        const { emoji, number } = ROLE_EMOJIS[roleId];
        const staffMembersList = filteredMembers.map(member => `<a:PM_Arrow:1240704950103969927> <@${member.id}>`).join('\n') || '<a:PM_Arrow:1240704950103969927>';

        staffListContent += `${emoji}・**<@&${roleId}>︲\`${member_count}/${number}\`**\n\n${staffMembersList}\n\n`;
    }

    return staffListContent;
}