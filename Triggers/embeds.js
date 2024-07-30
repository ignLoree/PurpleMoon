const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        const canaleregole = client.channels.cache.get('1027909059082473482');
        const verifica = client.channels.cache.get('1143287726830002347');
        const ticket = client.channels.cache.get('1027909064421806100');
        const donazioni = client.channels.cache.get('1157794476161507411');
        const membro = client.channels.cache.get('1208407273408561152');
        const private = client.channels.cache.get('1157725797881229353');
        const partner = client.channels.cache.get('1214624747552505896');
        const sponsor = client.channels.cache.get('1144618883794341899');
        const social = client.channels.cache.get('1173997489280528424');
        const colori = client.channels.cache.get('1141795238336282715');
        const profile = client.channels.cache.get('1141795044198723679');
        const pings = client.channels.cache.get('1134642213100453939');
        const info = client.channels.cache.get('1208406600629362690');
        const perks = client.channels.cache.get('1143527534315708516');
        const candidature = client.channels.cache.get('1143593920270442687');
        const leaderboard = client.channels.cache.get('1208407273408561152');

        const embeds = [
            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`<:PM_rules:1254460067600662580> **Entrando su PurpleMoon accetti il regolamento qui presente. Ti consigliamo di non violare le regole per vivere una esperienza migliore nel server!**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`<a:PM_mute:1257381412512727092> **\`REGOLA GENERALE 1.1\`** 
                ᲼᲼᲼↪ **Rispettare** i [__ToS__](https://discord.com/terms) e le [__Linee Guida__](https://discord.com/terms) di Discord.
  
        <a:PM_mute:1257381412512727092> **\`REGOLA GENERALE 1.2\`** 
        ᲼᲼᲼↪ **Non discriminare nessuno**, non accettiamo nessuna forma di razzismo, ᲼᲼᲼fascismo, omofobia,  __vietato__ **scrivere** o **dire** la \`f-word\` e la \`n-word\`.

        <a:PM_mute:1257381412512727092> **\`REGOLA GENERALE 1.3\`** 
        ᲼᲼᲼↪ **Rispettare** gli __utenti__ e lo __staff__ del server.
        
        <a:PM_mute:1257381412512727092> **\`REGOLA GENERALE 1.4\`** 
        ᲼᲼᲼↪ É vietato **auto-promuoversi**.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`<a:PM_mute:1257381412512727092> **\`REGOLA TESTUALE 2.1\`** 
                ᲼᲼᲼↪ É __vietato__ inviare **file** **gore**, **NSFW** o **dati sensibili** di un utente. 
  
        <a:PM_mute:1257381412512727092> **\`REGOLA TESTUALE 2.2\`** 
        ᲼᲼᲼↪ É __vietato__ avere **comportamenti toxic** o **troll** che conducono al flame.

        <a:PM_mute:1257381412512727092> **\`REGOLA TESTUALE 2.3\`** 
        ᲼᲼᲼↪ É __vietato__ inviare **link** contenenti virus, grabber, sponsor o social.

        <a:PM_mute:1257381412512727092> **\`REGOLA TESTUALE 2.4\`** 
        ᲼᲼᲼↪ É __vietato__ inviare **flood** o **Wall Of Text** che intasano la chat.
        
        <a:PM_mute:1257381412512727092> **\`REGOLA TESTUALE 2.5\`** 
        ᲼᲼᲼↪ É __vietato__ abusare di **parolacce**, **bestemmie** e ogni tipo di **insulto** a ᲼᲼᲼**divinità**.᲼᲼᲼`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`<a:PM_mute:1257381412512727092> **\`REGOLA VOCALE 3.1\`** 
                ᲼᲼᲼↪ É __vietato__ mostrare contenuti **gore**, **NSFW** o **dati sensibili** di un utente.
  
        <a:PM_mute:1257381412512727092> **\`REGOLA VOCALE 3.2\`** 
        ᲼᲼᲼↪ É __vietato__ avere **comportamenti toxic** o **troll** che conducono al flame.

        <a:PM_mute:1257381412512727092> **\`REGOLA VOCALE 3.3\`** 
        ᲼᲼᲼↪ É __vietato__ **disconnettere il bot** o cambiare musica mentre un utente sta ᲼᲼᲼ascoltando una canzone tramite il bot.

        <a:PM_mute:1257381412512727092> **\`REGOLA VOCALE 3.4\`** 
        ᲼᲼᲼↪ É __vietato__ utilizzare **SoundBoard** o qualunque tipo di **VoiceChanger**.
        
        <a:PM_mute:1257381412512727092> **\`REGOLA VOCALE 3.5\`** 
        ᲼᲼᲼↪ É __vietato__ **urlare** o fare **errape** col microfono.

        <a:PM_mute:1257381412512727092> **\`REGOLA VOCALE 3.6\`** 
        ᲼᲼᲼↪ É __vietato__ abusare di **parolacce** e **bestemmie** e ogni tipo di **insulto** a **divinità**.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`<a:PM_exclamation:1254787539055935500> __Lo staff si riserva il diritto di cambiare sanzioni e regole in base alla situazione.__᲼᲼᲼`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Blob:1159603716836569179> **__BENVENUTO SU PURPLEMOON__**`)
                .setDescription(`<a:PM_Verify:1159603518118830140> Per **verificarti** premi il pulsante **__\`Verify\`__**, successivamente *completa* il **Captcha** che ti sarà inviato in __CHAT__.

    <:PM_Ticket:1148995976267317258> Per **qualsiasi** problema,  non **esitate** ad aprire un **__<#1027909064421806100> \`SUPPORTO\`__**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_Ticket:1148995976267317258> **__TICKETS__**`)
                .setDescription(`<a:PM_Butterflies:1159603729264287855> Benvenuto nella **sezione** dedicata all'__assistenza__! Apri un **ticket** in base alle tue _esigenze_ e ricorda di **rispettare** il regolamento.

        <:PM_White_Dot:1147944922159272088> Massimo **__\`1\`__** ticket alla volta;
        <:PM_White_Dot:1147944922159272088> Scegli **sempre** la giusta sezione;
        <:PM_White_Dot:1147944922159272088>  Non **abusare** dei __ticket__;
        <:PM_White_Dot:1147944922159272088> Non aprire ticket __inutili__;`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_purplestars:1159597581337378957> **__DONAZIONI__**`)
                .setDescription(`> **Queste donazioni non sono obbligatorie ma aiutano a sostenere economicamente il server, più sono le donazioni più saranno i giveaway e i drop di nitro, e migliore sarà l'esperienza.**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_espeonrun:1159603974538809425> **__METODI DI DONAZIONE__**`)
                .setDescription(`> <a:PM_StarBlue:1157727107963703327>︲[**Cliccando qua**](https://www.paypal.com/paypalme/lorenzocorvagliaa) potrete **donare** tramite **PayPal**<:PM_PayPal:1240601766702092289>

        > <a:PM_StarPurple:1159597596130684948>︲Potete **donare** tramite **Nitro Boost** aprendo un <#1027909064421806100> \`HIGH STAFF\`
        
        > <a:PM_StarPink:1157726975750840320>︲Potete **donare** tramite **Bot Premium** aprendo un <#1027909064421806100> \`HIGH STAFF\``)
                .setFooter({ text: `⚠️ Attenzione: Le donazioni non sono rimborsabili` }),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle('<a:PM_Festa:1159603524116676648> **__PERKS__**')
                .setDescription(`**
        > \`\`\`Sotto i 5 euro\`\`\`
        > 
        > <:PM_1:1240417803522277436> <a:PM_Arrow:1240704950103969927> Ruolo <@&1157801832383520858>
        > 
        > <:PM_2:1240417801265610893> <a:PM_Arrow:1240704950103969927> Ruolo personalizzato con un icona a scelta e colore a scelta
        > 
        > <:PM_3:1240417799789084752> <a:PM_Arrow:1240704950103969927> Ogni volta che qualcuno ti pingherà/dirà il tuo nome/dirà abbreviazioni del tuo nome/dirà parole riconducibili a te o nomignoli compariranno un numero tra 1 e 5 reaction scelte da te
        > 
        > <:PM_4:1240417797734138067> <a:PM_Arrow:1240704950103969927> Perks del ruolo <@&1012650737773314138>
        > 
        >  \`\`\`Sopra i 5 euro\`\`\`
        > 
        > <:PM_1:1240417803522277436> <a:PM_Arrow:1240704950103969927> Ruolo <@&1157801832383520858>
        > 
        > <:PM_2:1240417801265610893> <a:PM_Arrow:1240704950103969927> Tutti i perks precedenti
        > 
        > <:PM_3:1240417799789084752> <a:PM_Arrow:1240704950103969927> Canale vocale privato
        > 
        > <:PM_4:1240417797734138067>  <a:PM_Arrow:1240704950103969927> Se vorrai aggiungere una sola emoji al server, basterà chiedere aprendo un  <#1027909064421806100> \`PERKS\` e noi l'aggiungeremo
        > 
        > <:PM_5:1240417794365984789> <a:PM_Arrow:1240704950103969927> Perks del ruolo <@&1012650737773314138>
        **`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Espeon:1159603974538809425>  **__RISCATTA I TUOI PERKS__**`)
                .setDescription(`<a:PM_Spark:1159597581337378957> Lo **staff** di **__PurpleMoon__** non vi __consegnerà__ automaticamente i **perks**. Dovrete aprire un __ticket__ __**\`PERKS\`**__ per **riscattarli**. Ovviamente questo non vale per **perks** riguardanti i **permessi**, come i **nick** o i **media**.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Star:1159603898831601694>  **__Utente della Settimana e del Mese__**`)
                .setDescription(`<a:PM_StarPink:1157726975750840320>︲**L'utente che avrà totalizzato più messaggi in chat e ore in vocale vincerà;**
        <a:PM_StarPurple:1159597596130684948>︲__L'utente della settimana sarà eletto ogni Sabato;__
        <a:PM_StarBlue:1157727107963703327>︲__L'utente del mese sarà elettro ogni primo del mese.__
        
        <a:PM_Butterfly:1159597588912296029>︲__Regole__:
        <:PM_1:1240417803522277436>︲**Le ore in cui uno l'utente starà afk non verranno prese in considerazione;**
        <:PM_2:1240417801265610893>︲Le ore trascorse in duo e private non verranno considerate; 
        <:PM_3:1240417799789084752>︲Per i messaggi invece sarà vietato __floddare__ per accumulare messaggi o usare i canali dei minigames; 
        <:PM_4:1240417797734138067>︲Verrà valutato anche il **comportamento** ai fini dell'assegnazione del ruolo.
        
        <a:PM_Jelly:1159603644459655289>︲__Vantaggi Utente della Settimana:__ 
        <:PM_1:1240417803522277436>︲**Ruolo** "<@&1204784196447379516>";
        <:PM_2:1240417801265610893>︲**Mandare** __GIF__ e __media__ in ogni **chat**;
        <:PM_3:1240417799789084752>︲**Mandare** __sticker esterni__ in ogni **chat**;
        <:PM_4:1240417797734138067>︲**Bypass** __requisiti__ degli __eventi__.
        
        <a:PM_Blob:1159603716836569179> ︲__Vantaggi Utente del Mese:__ 
        <:PM_1:1240417803522277436>︲**Ruolo** "<@&1204433183949721653>";
        <:PM_2:1240417801265610893>︲**Perks** dell'<@&1204784196447379516>;
        <:PM_3:1240417799789084752>︲Possibilità di __aggiungere__ **emoji** e **sticker**;
        <:PM_4:1240417797734138067>︲Stanza **privata** per tutto il __mese__ che può diventare **__permanente__** se __rispettati__ i **requisiti** (<#1157725797881229353>).`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Butterfly:1159597588912296029>︲**__VOCALI PRIVATE__**`)
                .setDescription(`> <a:PM_ribbonpurple2:1159603737409617951>︲**Cosa sono le vocali private?**

        <:PM_White_Dot:1147944922159272088> Sono delle vocali __personalizzabili__ dall'**utente**;
        <:PM_White_Dot:1147944922159272088> Possono essere usate **solo** tramite **__permesso del possessore__** o **__ruolo personalizzato__**. (<#1143527534315708516>).
        
        > <a:PM__Little_Kitty_Jelly_Purple:1159603644459655289>︲**Come si ottengono?**
        
        <:PM_1:1240417803522277436> Raggiungendo il **__livello 70__** (<#1143527534315708516>);
        <:PM_2:1240417801265610893> **Boostando** il __server__ **due volte**. (<#1143527534315708516>);
        <:PM_3:1240417799789084752> Facendo una **donazione** __superiore__ ai **5€** (<#1157794476161507411>)
        
        > <a:PM_Heart:1159603512875950130>︲**Permanenza in esse:**
        
        <:PM_White_Dot:1147944922159272088> Devono essere **attive** almeno **__2 ore a settimana__**.
        
        > **In caso di __inattività vocale__, esse potranno essere richieste in un ticket __\`HIGH STAFF\`__, facendo il doppio delle ore minime.**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Moon:1159603968163446784> **__PARTNERSHIP__**`)
                .setDescription(`<a:PM_Flash:1148010092046864394>  **PurpleMoon** offre il servizio di __partnership__ con ovviamente dei **requisiti** da rispettare. Per fare una __partnership__ sarà necessario aprire un <#1027909064421806100> \`PARTNERSHIP\`.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Candy:1159603503648485426> **__REGOLAMENTO__**`)
                .setDescription(`<a:PM_PlanetHeart:1159603896952557723> Ogni server che effettua una **sponsor** dovrà rispettare i **ToS**, le **Linee Guida** di Discord e il regolamento del server.

        <a:PM_Arrow:1240704950103969927> [**ToS di Discord**](https://discord.com/terms)
        <a:PM_Arrow:1240704950103969927> [**Linee Guida di Discord**](https://discord.com/guidelines)
        <a:PM_Arrow:1240704950103969927> [**Regolamento di PurpleMoon**](https://discord.com/channels/925356691028070421/1027909059082473482)`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Fiocco:1159603737409617951>  **__REQUISITI__**`)
                .setDescription(`<a:PM_Butterfly:1159597588912296029> **Qui sotto** trovate elencati i **requisiti** che __ogni server__ dovrà **rispettare** se vorrà fare una __partnership__ con noi.

        \`›                             ›\`
        
        **<:PM_1:1240417803522277436>  Colui che farà la partnership non dovrà uscire dal server, in caso succedesse la partner verrà tolta e il server/catena blacklistato.
        <:PM_2:1240417801265610893> Il server non deve essere toxic
        <:PM_3:1240417799789084752> Il server dovrà avere una community attiva**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Moon:1159603968163446784> **__REQUISITI SPONSOR__**`)
                .setDescription(`<a:PM_Flash:1148010092046864394> **PurpleMoon** offre un servizio di __sponsor__ con dei **requisiti** da rispettare. Per fare una __sponsor__ bisognerà aprire un <#1027909064421806100> \`HIGH STAFF\`.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Candy:1159603503648485426> **__REGOLAMENTO__**`)
                .setDescription(`<a:PM_PlanetHeart:1159603896952557723> Ogni server che vorrà effettuare una **sponsor** dovrà rispettare questi 3 requisiti:
        ᲼᲼᲼↪ <:PM_rules:1254460067600662580> Rispettare i [**ToS di Discord**](https://discord.com/terms)
        ᲼᲼᲼↪ <:PM_rules:1254460067600662580> Rispettare le [**Linee Guida di Discord**](https://discord.com/guidelines)
        ᲼᲼᲼↪ <:PM_rules:1254460067600662580> Rispettare il [**Regolamento di PurpleMoon**](https://discord.com/channels/925356691028070421/1027909059082473482)`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Fiocco:1159603737409617951>  **__METODI DI PAGAMENTO__**`)
                .setDescription(`<a:PM_Butterfly:1159597588912296029> Per effettuare una sponsor con __PurpleMoon__ ci sono due modalità: **pagando** oppure esponendo una **collaborazione** in un <#1027909064421806100> \`HIGH STAFF\`.
        
        <:PM_PayPal:1240601766702092289> **€1,50**
        ᲼᲼᲼↪ sponsor per **2** settimane.
        <:PM_PayPal:1240601766702092289> **€3**
        ᲼᲼᲼↪ sponsor per **1 **mese.
        <:PM_PayPal:1240601766702092289> **€5**
        ᲼᲼᲼↪ sponsor per **sempre**.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Star:1159603898831601694> **__PING__**`)
                .setDescription(`<a:PM_Heart:1159603512875950130> I **ping** variano in base al __numero__ di **membri** del server.
        
        <:PM_mention:1261324199545278536> Meno di **500**
        ᲼᲼᲼↪ \`no ping\`
        <:PM_mention:1261324199545278536> Tra i **500** e i **1000**
        ᲼᲼᲼↪ \`ping @here\`
        <:PM_mention:1261324199545278536> **1000+**
        ᲼᲼᲼↪ \`ping @everyone\``),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_rocketpink:1159603965328109712> **SPONSOR SOCIAL**`)
                .setDescription(`<a:PM_tadapurple:1159603524116676648> **PurpleMoon** offre un servizio di **sponsor** dei vostri __canali__ **\`Twitch\`** e **\`YouTube\`**! Sotto troverai le informazioni di cui hai bisogno.
        <:PM_Ticket:1240601808188215317> Per richiedere una **sponsor**, bisogna aprire un <#1027909064421806100> **__\`HIGH STAFF\`__**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_Twitch:1240601423285325845> **Twitch**`)
                .setDescription(`**Requisiti:**
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Avere __25 spect__ di media
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Mettere un alert che ogni mezz'ora __invii il link__ del nostro server in chat
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Non avere __altre__ sponsor con altri server
        ᲼᲼᲼↪ <a:PM_Punto:1159603819752194099> **Facoltativo:** Ogni ora di stream dovrete sponsorizzare in qualche modo **PurpleMoon**.
        
        **Noi in cambio:**
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Invieremo il __link__ della vostra live con il ping <@&1151640146131812452> nel canale <#1173997274783826012>.
        ᲼᲼᲼↪ <a:PM_Punto:1159603819752194099> **Facoltativo:** Creeremo un __canale privato__ con il vostro nome dove potrete fare le vostre live tranquillamente con vostri amici o fan.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_YouTube:1240601471050059787> **YouTube**`)
                .setDescription(`**Requisiti:**
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Avere almeno __300 iscritti__ e una media di __100 visual__ o più a video
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Mettere il link del server nella descrizione del video
        ᲼᲼᲼↪ <a:PM_Punto:1159603819752194099> **Facoltativo:** In ogni video e/o stream dovrete sponsorizzare **PurpleMoon** (Non alla fine).
        
        **Noi in cambio:**
        ᲼᲼᲼↪ <:PM_White_Dot:1147944922159272088> Invieremo il __link__ del vostro video o della vostra live con il ping <@&1151640146131812452> nel canale <#1239589881320050729>.
        ᲼᲼᲼↪ <a:PM_Punto:1159603819752194099> **Facoltativo:** Creeremo un __canale privato__ con il vostro nome dove potrete fare le vostre live o registrare tranquillamente con vostri amici o fan.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`**COLORI PURPLEMOON**`)
                .setDescription(`**Cliccando le reazioni del messaggio qua sotto potrai personalizzarti il profilo con un colore diverso dagli altri utenti!**`),

            new EmbedBuilder()
                .setColor('#7f171f')
                .setTitle(`───・**__Tonalità di Rosso__**・───`)
                .setDescription(`⠀⠀⠀
        🐞 <a:PM_Arrow:1240704950103969927> <@&1142108672353374321>
        🍒 <a:PM_Arrow:1240704950103969927> <@&1143842743727165531>
        🦀 <a:PM_Arrow:1240704950103969927> <@&1143842838589739058>
        🦞 <a:PM_Arrow:1240704950103969927> <@&1143842803223367682>`),

            new EmbedBuilder()
                .setTitle(`───・**__Tonalità di Arancione__**・───`)
                .setDescription(`⠀⠀⠀
        🐙 <a:PM_Arrow:1240704950103969927> <@&1143848556696969326>
        🎃 <a:PM_Arrow:1240704950103969927> <@&1143848654940143676>
        🪸 <a:PM_Arrow:1240704950103969927> <@&1143848388824158319>
        🍊 <a:PM_Arrow:1240704950103969927> <@&1142108641848209418>`)
                .setColor(`#d5654d`),

            new EmbedBuilder()
                .setTitle(`───・**__Tonalità di Giallo__**・───`)
                .setDescription(`⠀⠀⠀
        🎗️ <a:PM_Arrow:1240704950103969927> <@&1143844027532316732>
        🪙 <a:PM_Arrow:1240704950103969927> <@&1143844472447307776>
        🐤 <a:PM_Arrow:1240704950103969927> <@&1142108563553140857>
        🍋 <a:PM_Arrow:1240704950103969927> <@&1143844879504523324>`)
                .setColor(`#ffd700`),

            new EmbedBuilder()
                .setTitle(`───・**__Tonalità di Verde__**・───`)
                .setDescription(`⠀⠀⠀
        🦎 <a:PM_Arrow:1240704950103969927> <@&1143845985722847252>
        🐸 <a:PM_Arrow:1240704950103969927> <@&1143845686983540746>
        🍏 <a:PM_Arrow:1240704950103969927> <@&1143845218752417863>
        🍀 <a:PM_Arrow:1240704950103969927> <@&1142108518959288360>`)
                .setColor(`#bfe88b`),

            new EmbedBuilder()
                .setTitle(`───・**__Tonalità di Blu__**・───`)
                .setDescription(`⠀⠀⠀
        🐟 <a:PM_Arrow:1240704950103969927> <@&1143846657792946258>
        🐳 <a:PM_Arrow:1240704950103969927> <@&1143846819730817134>
        🐬 <a:PM_Arrow:1240704950103969927> <@&1143846918171136071>
        🪬 <a:PM_Arrow:1240704950103969927> <@&1142108470829662238>`)
                .setColor('#4169e1'),

            new EmbedBuilder()
                .setTitle(`───・**__Tonalità di Viola__**・───`)
                .setDescription(`⠀⠀⠀
        💜 <a:PM_Arrow:1240704950103969927> <@&1142108451347107930>
        👚 <a:PM_Arrow:1240704950103969927> <@&1143847842616717352>
        🦜 <a:PM_Arrow:1240704950103969927> <@&1143847821485809705>
        🦩 <a:PM_Arrow:1240704950103969927> <@&1143847670474084385>`)
                .setColor(`#e1c4ff`),

            new EmbedBuilder()
                .setTitle(`───・**__Tonalità di Nero__**・───`)
                .setDescription(`⠀⠀⠀
        🖤 <a:PM_Arrow:1240704950103969927> <@&1142108066918178937>
        🦭 <a:PM_Arrow:1240704950103969927> <@&1143849283439841310>
        🐨 <a:PM_Arrow:1240704950103969927> <@&1143849501090664448>
        🐼 <a:PM_Arrow:1240704950103969927> <@&1142108281112895569>`)
                .setColor('#808080'),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`───・__Quali sono i tuoi pronomi?__・───`)
                .setDescription(`⠀⠀⠀
        🌸 <a:PM_Arrow:1240704950103969927> <@&1143627962416115905>
        💮 <a:PM_Arrow:1240704950103969927> <@&1143627996377399316>
        🏵️ <a:PM_Arrow:1240704950103969927> <@&1143628151218515978>
        🌺 <a:PM_Arrow:1240704950103969927> <@&1143628187813806141>
        🪷 <a:PM_Arrow:1240704950103969927> <@&1143628295997501600>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`───・__Da dove provieni?__・───`)
                .setDescription(`⠀⠀⠀
        🥨 <a:PM_Arrow:1240704950103969927> <@&1143628576013439166>
        🥩 <a:PM_Arrow:1240704950103969927> <@&1143628649392787508>
        🍕 <a:PM_Arrow:1240704950103969927> <@&1143628669680619560>
        🧂 <a:PM_Arrow:1240704950103969927> <@&1143628695714664550>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`───・__DM Status__・───`)
                .setDescription(`⠀⠀⠀
        📪 <a:PM_Arrow:1240704950103969927> <@&1143628323507945693>
        📫 <a:PM_Arrow:1240704950103969927> <@&1143628353228783767>
        📭 <a:PM_Arrow:1240704950103969927> <@&1143628381636792361>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`───・__Quanti anni hai?__・───`)
                .setDescription(`⠀⠀⠀
        🍓 <a:PM_Arrow:1240704950103969927> <@&1224640977260515409>
        🫧 <a:PM_Arrow:1240704950103969927> <@&1224640208260304916>
        💦 <a:PM_Arrow:1240704950103969927> <@&1224640375235280909>
        🌶️ <a:PM_Arrow:1240704950103969927> <@&1224641105740693515>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`───・__Qual è il tuo stato sentimentale?__・───`)
                .setDescription(`⠀⠀⠀
        💓 <a:PM_Arrow:1240704950103969927> <@&1143628437349736591>
        💞 <a:PM_Arrow:1240704950103969927> <@&1143628461433434132>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`───・__Vuoi vedere i canali NSFW?__・───`)
                .setDescription(`⠀⠀⠀
        🔞 <a:PM_Arrow:1240704950103969927> <@&1210356284885434399>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`・**__PING__**・`)
                .setDescription(`<:PM_DeadChat:1198001376471564389> <a:PM_Arrow:1240704950103969927> <@&1143653707905515570>

        🎉 <a:PM_Arrow:1240704950103969927> <@&1143655921734647941> 
        
        📣 <a:PM_Arrow:1240704950103969927> <@&1141820892641497168> 
        
        📊 <a:PM_Arrow:1240704950103969927> <@&1143915682120077373> 
        
        <:PM_Twitch:1196922779027656755> <a:PM_Arrow:1240704950103969927> <@&1151640146131812452> 
        
        🔔 <a:PM_Arrow:1240704950103969927> <@&1173986657993752576>
        
        ⚙️ <a:PM_Arrow:1240704950103969927> <@&1213971687767285790>
        
        🗣️ <a:PM_Arrow:1240704950103969927> <@&1217416034215006255>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Candy:1159603503648485426> BENVENUTI NELLA NOSTRA COMMUNITY!`)
                .setDescription(`Ti diamo il benvenuto nella nostra community, qui potrai __socializzare__ e __divertirti__ con eventi, giveaway, scrivendo in chat e parlando con le altre persone. Ti aspettiamo nella [chat generale](https://discord.com/channels/925356691028070421/1142078901892427836) e nelle [chat vocali](https://discord.com/channels/925356691028070421/1027909060600795198). <a:PM_Butterfly:1159597588912296029>

        Pensi di perdere il tuo tempo su Discord? Qui potrai invece usarlo a tuo vantaggio per riscattare ricompense come nitro o soldi!
        
        <a:PM_Clouds:1159597587154870463> Per **personalizzare il profilo** vai in <#1141795238336282715> <#1141795044198723679> <#1134642213100453939> <a:PM_Clouds:1159597587154870463>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`Se hai bisogno di qualcosa ti basta aprire un [ticket di supporto](https://discord.com/channels/925356691028070421/1027909064421806100) e attendere l'arrivo dello Staff.`)
                .addFields(
                    {
                        name: `Info`,
                        value: `<a:PM_StarPurple:1159597596130684948> Owner: <@295500038401163264> 
                <a:PM_Candy:1159603503648485426> Creato il: \`28/12/2021 alle 12:57\`
                <a:PM_Clouds:1159597587154870463> Invito: https://discord.gg/purplemoon`,
                        inline: true
                    },
                    {
                        name: `Social`,
                        value: `<:PM_TikTok:1240601709726924820> [@purplemoonnetwork](https://www.tiktok.com/@purplemoonnetwork)
                <a:PM_Instagram:1240602079332929569> [@purplemoonnetwork](https://www.instagram.com/purplemoonnetwork/)
                <a:PM_Festa:1159603524116676648> [Solo.to](https://solo.to/purplemoon)
                <:PM_Gelato:1159603647039143956> [Ko-Fi](https://ko-fi.com/purplemoonnetwork)`,
                        inline: true
                    }
                ),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_purple_candy:1159603638990287013> __CATEGORIE PERKS__`)
                .setDescription(`<a:PM__Little_Pretty_Star_Purple:1159603898831601694> Cliccando i **bottoni** qua sotto, potrete vedere i **__vantaggi__** e come **__ottenerli__**.

            <a:PM_purple_lollipop:1159603654085595206> **LISTA RUOLI:**
            > <a:PM_Boost:1148010086061576202> <@&1012650737773314138> & <@&1213972926144053369>
            > <a:PM_purpleheart:1159603512875950130> <@&1144199212012150834>
            > <:PM_purple_boba:1159603655847190588> **Dal livello <@&1142880166536810706> al livello <@&1143624415184175255>**
            > <a:PM_Diamond:1148914201453142076> **Member Of The Week**`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`<a:BG_Flash:1148010092046864394> **__PurpleMoon__** dispone di **__\`3\`__** _ruoli distinti_ a cui candidarsi: **__\`Helper\`__**,**__\`Gestore Partner\`__** e **__\`Event Maker\`__**. 
        > Se __selezionati__, sarà necessario **__dare priorità__** a PurpleMoon rispetto ad altri server, poiché è richiesta un'__attività costante__.

        <a:PM_StarPurple:1159597596130684948> | Ogni **ruolo** è __descritto__ nel rispettivo __webhook__, che è possibile trovare cliccando i **pulsanti sottostanti**. Troverete anche il **__link__** per inviare la vostra **candidatura**.
        
        <:PM_White_Dot:1147944922159272088> Per candidarsi, è necessario soddisfare i seguenti requisiti:

        ㅤ<a:PM_Arrow:1240704950103969927> **Avere** almeno **\`14 anni\`**
        ㅤ<a:PM_Arrow:1240704950103969927> **Rispettare** i **\`ToS\`** e le **\`linee guida\`**
        ㅤ<a:PM_Arrow:1240704950103969927> Essere **\`maturi\`** e **\`attivi\`**
        ㅤ<a:PM_Arrow:1240704950103969927> __Non__ **essere** stati **\`mutati\`** o **\`bannati\`** nel server.`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle('<a:PM_StarPurple:1159597596130684948> Top 3 Donatori PurpleMoon <a:PM_StarPurple:1159597596130684948>')
                .setDescription(`<a:PM_StarPink:1157726975750840320> **__Classifica globale donatori PurpleMoon:__** <a:PM_StarPink:1157726975750840320>
        
        <:PM_1:1240417803522277436>° Posizione <a:PM_Arrow:1240704950103969927> <@610531025470095390>ㆍ**__6.00€__** <a:PM_GoldenCrown:1219795702121631754>
        
        <:PM_2:1240417801265610893>° Posizione <a:PM_Arrow:1240704950103969927> <@1015610167154442291>ㆍ **__5.00€__** <a:PM_BlueCrown:1219795787303616602>
        
        <:PM_3:1240417799789084752>° Posizione <a:PM_Arrow:1240704950103969927> ㆍ <a:PM_WhiteCrown:1219795879947403294>`),

            new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Diamond:1148914201453142076> **__Members Of The Week__**`)
                .setDescription(`<:PM_White_Dot:1147944922159272088> Al concludersi della settimana verrano conferiti dei premi al __membro più attivo all'interno delle chat testuali e delle chat vocali__, da considerarsi validi per tutta la durata della settimana seguente!
                
                <:PM_ghostwriter:1222940668914307132>  <@&1217951780990881922>
                <:PM_White_Dot:1147944922159272088> Moltiplicatore \`10%\` globale
                <:PM_White_Dot:1147944922159272088> Possibilità di creare un emoji custom
                <:PM_White_Dot:1147944922159272088> Possibilità di ottenere una reazione quando si viene taggati

                <:PM_vocalist:1222940666884264019> <@&1217951956157337632>
                <:PM_White_Dot:1147944922159272088> Moltiplicatore \`10%\` globale
                <:PM_White_Dot:1147944922159272088> Possibilità di creare una soundboard a scelta
                <:PM_White_Dot:1147944922159272088> Possibilità di ottenere una reazione quando si viene taggati`),
        ];

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('︲Regolamento')
                    .setEmoji('📜')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/channels/925356691028070421/1027909059082473482'),
                new ButtonBuilder()
                    .setLabel('︲Perks')
                    .setEmoji('💎')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/channels/925356691028070421/1143527534315708516'),
                new ButtonBuilder()
                    .setLabel('︲Donazioni')
                    .setEmoji('💵')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/channels/925356691028070421/1157794476161507411'),
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('︲Chat Generale')
                    .setEmoji('🌆')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/channels/925356691028070421/1142078901892427836'),
                new ButtonBuilder()
                    .setLabel('︲Info Private')
                    .setEmoji('🌵')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/channels/925356691028070421/1157725797881229353'),
                new ButtonBuilder()
                    .setLabel('︲Leaderboard')
                    .setEmoji('🏆')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/channels/925356691028070421/1208407273408561152'),
            );

        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('booster')
                    .setLabel('︲PurpleMoon Booster')
                    .setEmoji(`<a:PM_Boost:1148010086061576202>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('supporter')
                    .setLabel('︲Supporter')
                    .setEmoji(`<a:PM_Heart:1159603512875950130>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('level')
                    .setLabel('︲Level Perks')
                    .setEmoji(`<:PM_Boba:1159603655847190588>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('member')
                    .setLabel('︲Members Of The Week')
                    .setEmoji(`<a:PM_Diamond:1148914201453142076>`)
                    .setStyle(ButtonStyle.Secondary)
            );

        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('trial')
                    .setLabel('︲Helper')
                    .setEmoji(`<:PM_Helper:1240651416863768700>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('partner')
                    .setLabel('︲Gestore Partner')
                    .setEmoji(`<:PM_PartnerManager:1240651401902690314>`)
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('event')
                    .setLabel('︲Event Maker')
                    .setEmoji(`<:PM_EventManager:1246046502653263882>`)
                    .setStyle(ButtonStyle.Secondary)
            );

        /*
        if (social) {
            social.send({ embeds: [embeds[20], embeds[21], embeds[22]] }).catch(console.error);
        }
        if (sponsor) {
            sponsor.send({ embeds: [embeds[16], embeds[17], embeds[18], embeds[19]] }).catch(console.error);
        } 
        if (donazioni) {
            donazioni.send({ embeds: [embeds[43]] }).catch(console.error);
            donazioni.send({ embeds: [embeds[7], embeds[8], embeds[9], embeds[10]] }).catch(console.error);
        }
        if (verifica) {
            verifica.send({ embeds: [embeds[5]] }).catch(console.error);
        }
        if (ticket) {
            ticket.send({ embeds: [embeds[6]] }).catch(console.error);
        }
        if (membro) {
            membro.send({ embeds: [embeds[11]] }).catch(console.error);
        }
        if (partner) {
            partner.send({ embeds: [embeds[13], embeds[14], embeds[15]] }).catch(console.error);
        }
        if (pings) {
            pings.send({ embeds: [embeds[38]] }).catch(console.error);
        }
        if (profile) {
            profile.send({ embeds: [embeds[32]] }).catch(console.error);
            profile.send({ embeds: [embeds[33]] }).catch(console.error);
            profile.send({ embeds: [embeds[34]] }).catch(console.error);
            profile.send({ embeds: [embeds[35]] }).catch(console.error);
            profile.send({ embeds: [embeds[36]] }).catch(console.error);
            profile.send({ embeds: [embeds[37]] }).catch(console.error);
        }
        if (colori) {
            colori.send({ embeds: [embeds[24]] }).catch(console.error);
            colori.send({ embeds: [embeds[25]] }).catch(console.error);
            colori.send({ embeds: [embeds[26]] }).catch(console.error);
            colori.send({ embeds: [embeds[27]] }).catch(console.error);
            colori.send({ embeds: [embeds[28]] }).catch(console.error);
            colori.send({ embeds: [embeds[29]] }).catch(console.error);
            colori.send({ embeds: [embeds[30]] }).catch(console.error);
            colori.send({ embeds: [embeds[31]] }).catch(console.error);
        }
        if (leaderboard) {
            leaderboard.send({ embeds: [embeds[44]]}).catch(console.error);
        }
        if (candidature) {
            candidature.send({ embeds: [embeds[42]], components: [row4] }).catch(console.error);
        }
        if (info) {
            info.send({ embeds: [embeds[39]], components: [row1] }).catch(console.error);
            info.send({ embeds: [embeds[40]], components: [row2] }).catch(console.error);
        }
        if (perks) {
            perks.send({ embeds: [embeds[41]], components: [row3] }).catch(console.error);
        }
        if (private) {
            private.send({ embeds: [embeds[12]] }).catch(console.error);
        }
        if (canaleregole) {
            canaleregole.send({ embeds: [embeds[0], embeds[1], embeds[2], embeds[3], embeds[4]] }).catch(console.error);
        }
        */
    }
}