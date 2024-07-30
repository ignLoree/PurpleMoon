const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        const moderazione = client.channels.cache.get('1203472074136358973');
        const beststaff = client.channels.cache.get('1208413532689801268');
        const guidastaff = client.channels.cache.get('1147987276840833115');
        const staffpagato = client.channels.cache.get('1252988733506977852');

        const embeds = [
            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:BG_Flash:1148010092046864394> **__SANZIONI__**`)
                .setDescription(`<a:PM_Punto:1159603819752194099> __ REGOLAMENTO GENERALE__

            <:PM_White_Dot:1147944922159272088> **__Regola \`1.1\`__** <a:PM_Arrow:1240704950103969927> **Ban**
            <:PM_White_Dot:1147944922159272088> **__Regola \`1.2\`__** <a:PM_Arrow:1240704950103969927> **Richiamo** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __12h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`1.3\`__** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __9h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`1.4\`__** <a:PM_Arrow:1240704950103969927> **Ban**
            
            \`›                             ›\`
            
            <a:PM_Punto:1159603819752194099> __REGOLAMENTO TESTUALE__
            
            <:PM_White_Dot:1147944922159272088> **__Regola \`2.1\`__** <a:PM_Arrow:1240704950103969927> **Richiamo** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __6h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`2.2\`__** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __9h__** <a:PM_Arrow:1240704950103969927> **Mute __12h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`2.3\`__** <a:PM_Arrow:1240704950103969927> **Ban**
            <:PM_White_Dot:1147944922159272088> **__Regola \`2.4\`__** <a:PM_Arrow:1240704950103969927> **Richiamo** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __9h__** <a:PM_Arrow:1240704950103969927> **Mute __12h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`2.5\`__** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __9h__**
            
            \`›                             ›\`
            
            <a:PM_Punto:1159603819752194099> __REGOLAMENTO VOCALE__
            
            <:PM_White_Dot:1147944922159272088> **__Regola \`3.1\`__** <a:PM_Arrow:1240704950103969927> **Richiamo** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __6h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`3.2\`__** <a:PM_Arrow:1240704950103969927> **Richiamo** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __6h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`3.3\`__** <a:PM_Arrow:1240704950103969927> **Richiamo** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __9h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`3.4\`__** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __6h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`3.5\`__** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __12h__**
            <:PM_White_Dot:1147944922159272088> **__Regola \`3.6\`__** <a:PM_Arrow:1240704950103969927> **Warn** <a:PM_Arrow:1240704950103969927> **Mute __3h__** <a:PM_Arrow:1240704950103969927> **Mute __6h__** <a:PM_Arrow:1240704950103969927> **Mute __9h__**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_GoldenCrown:1219795702121631754> **__Staffer della settimana__**`)
                .setDescription(`<a:PM_StarPink:1157726975750840320>︲**Colui che avrà totalizzato più messaggi in chat e ore in vocale;**
            <a:PM_StarPurple:1159597596130684948>︲Gli high avranno un punto in più per l'aiuto amministrativo;
            <a:PM_StarBlue:1157727107963703327>︲__Lo staffer della settimana sarà eletto ogni sabato.__
            
            <a:PM_Butterfly:1159597588912296029>・__Regolamento__:
            <:PM_1:1240417803522277436>︲**Le ore in cui uno staffer starà afk in voc con audio e microfono disattivati non verranno prese in considerazione;**
            <:PM_2:1240417801265610893>︲Stesso discorso per le ore trascorse in duo e private;
            <:PM_3:1240417799789084752>︲Per quanto riguarda i messaggi, sarà vietato floddare per accumulare messaggi;  
            <:PM_4:1240417797734138067>︲Ovviamente verrà valutato anche il **comportamento:** Se avrete un comportamento scorretto nei confronti di un utente/staffer, vi verrà detratto un "punto".
            
            <a:PM_Jelly:1159603644459655289>〃__Si riceveranno i seguenti vantaggi:__ 
            <:PM_1:1240417803522277436>︲Ruolo esclusivo "staffer della settimana";
            <:PM_2:1240417801265610893>︲**\`4\`** giorni di pausa in più; 
            <:PM_3:1240417799789084752>︲Più probabilità di essere pexati nell'arco della settimana; 
            <:PM_4:1240417797734138067>︲Ruolo vip per quella settimana`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Butterfly:1159597588912296029> **__INTRODUZIONE__**`)
                .setDescription(`<a:PM_StarPurple:1159597596130684948> La **__guida staff__** di __PurpleMoon__ serve per portar **ordine** tra lo __staff__, infatti son presenti delle **__regole__** che __tutti__ dovranno **rispettare**, in __caso__ vengano \`trasgredite\`, potreste andare in contro a **__sanzioni__**, come **__\`valutazioni negative\`__** o in casi estremi il **__\`depex\`__**.

            > <:PM_app:1240579272981348353> La __guida staff__ si divide in **__\`5\` sezioni__** che sono __accessibili__ **schiacciando** i \`bottoni\` sottostanti.
            
            ➥ **Regole staff**
            ➥ **Limiti Settimanali**
            ➥ **Pause**
            ➥ **Valutazioni staff**
            ➥ **Sanzioni**

            <a:PM_warning:1240712074875768863> Per tutti i __**dubbi**__ sulla \`guida staff\` **contattate** un **__\`Founder\`__** che vi __fornirà **assistenza**__.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_StarPurple:1159597596130684948> **__ULTERIORI PRECISAZIONI__**`)
                .setDescription(`<:PM_White_Dot:1147944922159272088> **__\`1\`__** <a:PM_Arrow:1240704950103969927> Bisogna **__sempre__** allegare le **prove** (screen, video, link di messaggi).
       
       <:PM_White_Dot:1147944922159272088> **__\`2\`__** <a:PM_Arrow:1240704950103969927> Il __numero__ della **sanzione** si basa su quante volte l'**utente** è stato **sanzionato __generalmente__**.
       
       <:PM_White_Dot:1147944922159272088> **__\`3\`__** <a:PM_Arrow:1240704950103969927> Quando **sanzionate**, usate sempre l'**__articolo__** del **regolamento** infranto.
       
       <:PM_White_Dot:1147944922159272088> **__\`4\`__** <a:PM_Arrow:1240704950103969927> Per visualizzare **quante** volte un __utente__ è stato **sanzionato** usate il comando ?modlogs **__\`ID\`__**
       
       <:PM_White_Dot:1147944922159272088> **__\`5\`__** <a:PM_Arrow:1240704950103969927> Bisogna **__sempre__** sanzionare nel canale <#1143470702876446740>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_heartpuff_pink:1221878873646698556>︲**__STAFF PAGATO__**`)
                .setDescription(`\`›                             ›\`
                
                **__\`150\`__** partner <a:PM_Arrow:1240704950103969927> **__2__ euro** <:PM_PayPal:1240601766702092289>

**__\`175\`__** partner <a:PM_Arrow:1240704950103969927> **__3__ euro** <:PM_PayPal:1240601766702092289> / **Nitro __Basic__** <:PM_NitroBasic:1252990972594487370>

**__\`250\`__** partner <a:PM_Arrow:1240704950103969927> **Nitro __Boost__** <a:PM_Boost:1148010086061576202>

\`›                             ›\`

<a:PM_Punto:1159603819752194099> Naturalmente, in caso di riscatto del **Nitro __Boost__**, almeno un **boost** dovrà andare a **__PurpleMoon__**.`)
        ]

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('regolamento')
                    .setLabel('︲Rules Staff')
                    .setEmoji(`<a:PM_Lollipop:1159603654085595206>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('limiti')
                    .setLabel('︲Limiti Settimanali')
                    .setEmoji(`<a:PM_Butterfly:1159597588912296029>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('pause')
                    .setLabel('︲Pause')
                    .setEmoji(`<a:PM_Moon:1159603968163446784>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('valutazioni')
                    .setLabel('︲Valutazioni Staff')
                    .setEmoji(`<a:PM_Staff:1240605781091680268>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('sanzioni')
                    .setLabel('︲Sanzioni')
                    .setEmoji(`<:PM_DiscordMod:1254786949856759884>`)
                    .setStyle(ButtonStyle.Secondary),
            );

        /*
        if (guidastaff) {
            guidastaff.send({ embeds: [embeds[2]], components: [row1] }).catch(console.error);
        }
        if (moderazione) {
            moderazione.send({ embeds: [embeds[0], embeds[3]] }).catch(console.error);
        }
        if (beststaff) {
            beststaff.send({ embeds: [embeds[1]] }).catch(console.error);
        }
        if (staffpagato) {
            staffpagato.send({ embeds: [embeds[4]] }).catch(console.error);
        }
        */
    }
}