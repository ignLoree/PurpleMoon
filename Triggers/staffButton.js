const { EmbedBuilder, Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {

        if (!interaction.guild) return;
        if (!interaction.message) return;
        if (!interaction.isButton) return;


        if (interaction.customId == 'sanzioni') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Punto:1159603819752194099> **__SANZIONI__**`)
                .setDescription(`<a:PM_Staff:1240605781091680268> Le __sanzioni__ su PurpleMoon sono **importantissime** poichè son presenti molti utenti che **infrangono** le regole.
            <a:PM_exclamation:1254787539055935500> Ogni staffer per sanzionare dovrà __seguire__ <#1203472074136358973>, chi non lo farà **riceverà** una __valutazione negativa__.
            
            ➥ **__LIMITI SETTIMANALI SULLE SANZIONI__**
            
            > Ogni <@&1143622574463520910> dovrà __eseguire__ almeno: **\`1 warn\`**
            > Ogni <@&1143622597498634251> dovrà __eseguire__ almeno: **\`2 sanzioni\`**

            <:PM_Red:1240688779354837112> Chi __rispetterà__ questi limiti riceverà **1 valutazione positiva** indipendentemente dal resoconto.`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'valutazioni') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:BG_Flash:1148010092046864394> **__VALUTAZIONI STAFF__**`)
                .setDescription(`<a:PM_Moon:1159603968163446784> Le **\`valutazioni staff\`** servono a __valutare__ l'**attività**, l'**aiuto** e l'**interesse** verso il server di uno staffer.
            ➥ Le valutazioni potranno essere **__positive__** e **__negative__**.

            > <:PM_green:1240597491603345428> Una **\`valutazione positiva\`** si __ottiene__ mettendo il **\`vanity/link\`** di PurpleMoon nello **stato** o nel **chi sono**, **\`aiutando\`** negli **eventi**, aver **\`testato\`** qualcosa e aver **\`aiutato\`** l'**amministrazione** e molti altri motivi che possono variare.

            > <:PM_Red:1240688779354837112> Una **\`valutazione negativa\`** si ottiene __non__ **rispettando** i **\`  limiti settimanali\`**, **\`comportandosi\`** in modo **irrispettoso** verso lo staff e utenti, __non__ **rispettando** le regole staff e altri comportamenti ritenuti dannosi

            <a:PM_warning:1240712074875768863> Le valutazioni **influenzano** sui __pex__ e __depex__ , infatti nei resoconti c'è una sezione solo per vedere il comportamento di uno staffer tramite esse.`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'pause') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_tempo:1240694496421744791> **__PAUSE__**`)
                .setDescription(`<:PM_pause:1240604816250507316> PurpleMoon presenta un **sistema** di **\`pause\`** _articolato_, infatti è tutto __organizzato__ per **garantire** al meglio l'__attività__ del server.
            Per __richiedere__ una pausa basta fare il comando </pausa request:1215398004182491149> in <#1192542191533424690>.

            ➥ **__LIMITI__**
            
            <a:PM_Online:1148031572876996618> In un anno si possono chiedere __massimo__ **\`2 mesi\`** di pausa che si possono usufruire in __tutti__ i **12 mesi** dell'anno. Ogni __2 valutazioni positive__ si potranno avere __3 giorni aggiuntivi__ di pause in tutto l'anno.
            <a:BG_Flash:1148010092046864394> Nei giorni **festivi** avrete anche dei giorni in più **ulteriori** al __normale mese__:
            ➥ **24**, **25**, **26**, **31** __dicembre__
            ➥ **1** gennaio
            ➥ **Pasqua** e **Pasquetta**
            
            <:PM_clessidra:1240695134782361661> Ovviamente per **garantire** al meglio l'attività del server ci sono dei __limiti__ di staffer che possono essere in pausa nello __stesso periodo__
            > ➥ <@&1143622574463520910> <a:PM_Arrow:1240704950103969927> __3__ **staffer**
            > ➥ <@&1143622597498634251> <a:PM_Arrow:1240704950103969927> __3__ **staffer**
            > ➥ <@&972616873021689916> <a:PM_Arrow:1240704950103969927> __2__ **staffer**
            > ➥ <@&1197954938702139484> <a:PM_Arrow:1240704950103969927> __1__ **staffer**
            > ➥ <@&1143622619866861579> <a:PM_Arrow:1240704950103969927> __2__ **staffer**
            
            <a:PM_Punto:1159603819752194099> Ricorda che se chiedi una **pausa** di **\`1\`** __giorno__, poi nello **stesso mese** __non__ puoi chiederne altre, quindi sfrutta bene il tuo periodo di pausa!
            <a:PM_Flames:1159603888815624192> In causa di **problemi gravi** possiamo fare __eccezioni__, se veniamo a scoprire che mentite sarete **direttamente depexati**.
            <a:PM_Siren:1159603826723135570> __La pausa può anche non venire accettata.__`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'limiti') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_Ping:1159603723245461565> **__LIMITI SETTIMANALI__**`)
                .setDescription(`<a:PM_Butterfly:1159597588912296029> I **\`limiti settimanali\`** sono dei **messaggi** e delle **ore di vocali** che entro una __settimana__ si devono __raggiungere__. In caso non si raggiungessero vi sono varie **sanzioni**.

            ➥ <@&1143622574463520910> 
            > <:PM_White_Dot:1147944922159272088> **__400__** messaggi
            > <:PM_White_Dot:1147944922159272088> **__3__** ore in vocale
            
            ➥ <@&1143622597498634251> 
            > <:PM_White_Dot:1147944922159272088> **__450__** messaggi
            > <:PM_White_Dot:1147944922159272088> **__3,30__** ore in vocale
            
            ➥ <@&972616873021689916> 
            > <:PM_White_Dot:1147944922159272088> **__450__** messaggi
            > <:PM_White_Dot:1147944922159272088> **__3,30__** ore in vocale
            
            ➥ <@&1197954938702139484> 
            > <:PM_White_Dot:1147944922159272088> **__500__** messaggi
            > <:PM_White_Dot:1147944922159272088> **__4__** ore in vocale`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'regolamento') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_rules:1254460067600662580> **__REGOLE STAFF__**`)
                .setDescription(`<:PM_hammer:1254460314804682904> Le **\`regole staff\`** sono **fondamentali** per garantire ordine nel server, quindi devono essere **__rispettate__** da tutto lo staff

            > ➥ **Rispettare** le <#1027909059082473482>
            > 
            > ➥ **Rispettare** tutto lo **\`staff\`** e gli **\`utenti\`**
            > 
            > ➥ __Non__ **istigare** o creare **flame** tra lo **\`staff\`** e gli **\`utenti\`**
            > 
            > ➥ __Non__ **abusare** di potere
            > 
            > ➥ __Non__ **dialogare** nei canali dove gli **\`utenti\`** non possono **scrivere**
            > 
            > ➥ __Non__ **floodare**, **spammare** e **usare bot** per completare i **\`limiti settimanali testuali\`**
            >   
            > ➥ __Non__ passare la maggior parte del **tempo** nei **canali vocali privati** e non stare mutati per raggiungere i **\`limiti settimanali vocali\`**
            > 
            > ➥ __Non__ **bestemmiare** in **\`chat pubbliche\`**, ma solo in chat private come la staff chat`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'lineeguida') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_Flower_Purple:1159603734221946922> **__LINEE GUIDA__**`)
                .setDescription(`<a:PM_Diamond:1148914201453142076> Le **Linee Guida** servono per avere una __visione__ **completa** e **oggettiva** sui __resoconti__. Esse si **dividono** in diversi **stadi** basati sull'**attività**.

            <a:PM_Spark:1159597581337378957> In base al **livello** raggiunto, si deciderà l'**azione** dello __staffer__, andrà ad **influire** questa scelta anche un **breve __riassunto__**, da aggiungere alla **fine** del **resoconto**.
            
            > <a:PM_Moon:1159603968163446784> La sezione **__\`Riassunto\`__**, invece, è l'unica parte **soggettiva**. Dovrete valutare **impegno**, **interesse** e **competenze** dello staffer **dimostrate** in quella __settimana__, cercando di rimanere il più **__obiettivi__ possibile**.`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'azioni') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Staff:1240605781091680268> **__AZIONI__**`)
                .setDescription(`<a:PM_Arrow:1240704950103969927> \`Depex\` in caso di mancato svolgimento dei limiti settimanali
            <a:PM_Arrow:1240704950103969927> \`Valutazione Negativa\` in caso di svolgimento **parziale** dei limiti settimanali
            <a:PM_Arrow:1240704950103969927> \`Pex\` in caso di svolgimento dei limiti settimanali
            <a:PM_Arrow:1240704950103969927> \`Valutazione Positiva\` in caso di svolgimento dei limiti settimanali ma ha più **valutazioni __negative__**`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'comportamento') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<:PM_app:1240579272981348353> **__COMPORTAMENTO__ **`)
                .setDescription(`<a:PM_Arrow:1240704950103969927> \`Bene\` se ha fatto i limiti settimanali
            <a:PM_Arrow:1240704950103969927> \`Male\` se non ha fatto i limiti settimanali
            <a:PM_Arrow:1240704950103969927> \`Discreto\` se ha fatto i limiti ma ha tante valutazioni negative o non ha fatto i limiti ma ha tante valutazioni positive`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'permessi') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Flames:1159603888815624192> **__PERMESSI__ **`)
                .setDescription(`<a:PM_Arrow:1240704950103969927> Warn
            
            <a:PM_Arrow:1240704950103969927> Kick
            
            <a:PM_Arrow:1240704950103969927> Timeout/Mute
            
            <a:PM_Arrow:1240704950103969927> Ban

            <a:PM_Arrow:1240704950103969927> Slowmode
            
            <a:PM_Punto:1159603819752194099> Tutti i comandi saranno da fare con <@155149108183695360> tramite \`? {id}\` o con \`/\`. Per qualsiasi sanzione da applicare sarà necessario avere prima l'approvazione di un <@&1143622365448765551>`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'comandi') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Punto:1159603819752194099> **__COMANDI__ **`)
                .setDescription(`<a:PM_Arrow:1240704950103969927> /valutazione negativa/positiva per dare una valutazione a uno staffer
            
            <a:PM_Arrow:1240704950103969927> /resoconti per fare il resoconti di uno staffer
            
            <a:PM_Arrow:1240704950103969927> /modname per cambiare il nick di un player in \`Moderated Nickname {randomNum}\`
            
            <a:PM_Punto:1159603819752194099> Tutti i comandi saranno da fare con <@155149108183695360> tramite \`? {id}\` o con \`/\`. Per qualsiasi sanzione da applicare sarà necessario avere prima l'approvazione di un <@&1143622365448765551>`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'limitihigh') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:BG_Flash:1148010092046864394> **__LIMITI SETTIMANALI__**`)
                .setDescription(`<a:PM_Butterfly:1159597588912296029> I limiti settimanali sono dei **messaggi** e delle **ore di vocali** che __entro__ \`una settimana\` si devono **raggiungere**. In __caso__ **non si raggiungessero** vi sono varie **sanzioni**.

            <a:PM_Arrow:1240704950103969927> <@&1143622619866861579> 
            <a:PM_diamond:1148914201453142076> **__550 messaggi__**
            <a:PM_diamond:1148914201453142076> **__4 ore e mezza in vocale__**
            
            <a:PM_Arrow:1240704950103969927> <@&1143622636220448940> 
            <a:PM_diamond:1148914201453142076> **__600 messaggi__**
            <a:PM_diamond:1148914201453142076> **__5 ore in vocale__**`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'permessihigh') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Flames:1159603888815624192> **__PERMESSI__ **`)
                .setDescription(`<a:PM_Arrow:1240704950103969927> Warn
            
            <a:PM_Arrow:1240704950103969927> Kick
            
            <a:PM_Arrow:1240704950103969927> Timeout/Mute
            
            <a:PM_Arrow:1240704950103969927> Ban

            <a:PM_Arrow:1240704950103969927> Slowmode
            
            <a:PM_Punto:1159603819752194099> Tutti i comandi saranno da fare con <@155149108183695360> tramite \`? {id}\` o con \`/\`.`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'comandihigh') {
            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setTitle(`<a:PM_Punto:1159603819752194099> **__COMANDI__ **`)
                .setDescription(`<a:PM_Arrow:1240704950103969927> /valutazione negativa/positiva per dare una valutazione a uno staffer
            
            <a:PM_Arrow:1240704950103969927> /resoconti per fare il resoconti di uno staffer
            
            <a:PM_Arrow:1240704950103969927> /modname per cambiare il nick di un player in \`Moderated Nickname {randomNum}\`

            <a:PM_Arrow:1240704950103969927> /pausa accept per accettare una pausa di uno staffer

            <a:PM_Arrow:1240704950103969927> /staff pex/depex per gestire lo staff
            
            <a:PM_Punto:1159603819752194099> Tutti i comandi saranno da fare con <@155149108183695360> tramite \`? {id}\` o con \`/\`.`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}