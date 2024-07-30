const { EmbedBuilder, Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {

        if (!interaction.guild) return;
        if (!interaction.message) return;
        if (!interaction.isButton) return;

        if (interaction.customId == 'booster') {

            const embeds = [
                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Boost:1148010086061576202> **__BOOSTER PERKS__**`)
                    .setDescription(`Questi **vantaggi** si potranno ottenere **boostando il server con Discord Nitro Boost**.

            \`\`\`BOOSTANDO UNA VOLTA\`\`\`
            
            <:PM_1:1240417803522277436> <a:PM_Arrow:1240704950103969927> Ruolo <@&1012650737773314138>
            
            <:PM_2:1240417801265610893> <a:PM_Arrow:1240704950103969927> **Boost** xp del **__5%__**
            
            <:PM_3:1240417799789084752> <a:PM_Arrow:1240704950103969927> Ruolo **personalizzato** con un'**icona** e un **colore** __a scelta__
            
            <:PM_4:1240417797734138067> <a:PM_Arrow:1240704950103969927> Inviare **media** in **__ogni__ chat**
            
            <:PM_5:1240417794365984789> <a:PM_Arrow:1240704950103969927> **Ogni volta** che qualcuno ti __pingherà__/__dirà il tuo nome__/__dirà abbreviazioni__ del tuo nome/__dirà parole riconducibili__ a te o __nomignoli__ **comparirà** una **reaction** scelta da te
            
            \`\`\`BOOSTANDO DUE VOLTE\`\`\`
            
            <:PM_1:1240417803522277436> <a:PM_Arrow:1240704950103969927>  Ruolo <@&1213972926144053369>
            
            <:PM_2:1240417801265610893> <a:PM_Arrow:1240704950103969927> Tutti i **perks precedenti**
            
            <:PM_3:1240417799789084752> <a:PM_Arrow:1240704950103969927> **__Bypass__** dei **requisiti** nei __giveaway__
            
            <:PM_4:1240417797734138067> <a:PM_Arrow:1240704950103969927> **1 ora** in più per **riscattare** i __premi__
            
            <:PM_5:1240417794365984789> <a:PM_Arrow:1240704950103969927> Canale **privato**
            
            \`\`\`                                                           \`\`\`
            
            <a:PM_Punto:1159603819752194099>**__\`(il ruolo e la stanza privata verranno rimossi in caso di rimozione dei boosts o in caso di mancato rinnovo)\`__**`),

                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Espeon:1159603974538809425>  **__RISCATTA I TUOI PERKS__**`)
                    .setDescription(`<a:PM_Spark:1159597581337378957> Lo **staff** di **__PurpleMoon__** non vi __consegnerà__ automaticamente i **perks**. Dovrete aprire un __ticket__ __**\`PERKS\`**__ per **riscattarli**. Ovviamente questo non vale per **perks** riguardanti i **permessi**, come i **nick** o i **media**.`)
            ]
            await interaction.reply({ embeds: [embeds[0], embeds[1]], ephemeral: true });
        }

        if (interaction.customId == 'supporter') {

            const embeds = [
                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Star:1159603898831601694>  **__SUPPORTER PERKS__**`)
                    .setDescription(`<a:PM_Rocket:1159603965328109712>  Per ottenere il ruolo <@&1144199212012150834> basterà __mettere__ l'invito di **PurpleMoon** **\`(https://discord.gg/purplemoon)\`** o inserire il solo.to **\`(https://solo.to/purplemoon)\`** nello __status__ o nell'__about me__. Puoi ricevere il ruolo anche partecipando a __eventi__
                
                <:PM_White_Dot:1147944922159272088> **Ruolo** esclusivo <@&1144199212012150834>
                <:PM_White_Dot:1147944922159272088> **Anticipazione** dei giveaway
                <:PM_White_Dot:1147944922159272088> **\`15\`** minuti in più per riscattare i giveaway
                <:PM_White_Dot:1147944922159272088> Mandare **adesivi** esterni in qualsiasi chat         

                <a:PM_Punto:1159603819752194099> **__\`nel caso l'utente uscisse dal server i ruoli saranno rimossi\`__**`),

                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Espeon:1159603974538809425>  **__RISCATTA I TUOI PERKS__**`)
                    .setDescription(`<a:PM_Spark:1159597581337378957> Lo **staff** di **__PurpleMoon__** non vi __consegnerà__ automaticamente i **perks**. Dovrete aprire un __ticket__ __**\`PERKS\`**__ per **riscattarli**. Ovviamente questo non vale per **perks** riguardanti i **permessi**, come i **nick** o i **media**.`)
            ]
            await interaction.reply({ embeds: [embeds[0], embeds[1]], ephemeral: true });
        }

        if (interaction.customId == 'level') {

            const embeds = [
                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<:PM_Succo:1159603637241270373> **__LEVEL PERKS__**`)
                    .setDescription(`<:PM_Gelato:1159603647039143956> Per **salire** di livello e **ottenere** i ruoli bisogna **messaggiare** in <#1142078901892427836> e stare in **vocale** nei canali dei server. <@339254240012664832> vi avviserà quando salirete di **livello**.
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1142880166536810706>
                    ᲼᲼᲼↪ **Ruolo apposito**
                    ᲼᲼᲼↪ Cambiarsi il **__nick__**
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1142880256152322118>
                    ᲼᲼᲼↪ **Ruolo apposito**
                    ᲼᲼᲼↪ Cambiarsi il **__nick__**
                    ᲼᲼᲼↪ **10** minuti **__in più__** per **riscattare** un __giveaway__
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1142880295415197817>
                    ᲼᲼᲼↪ **Ruolo apposito**
                    ᲼᲼᲼↪ Tutti i **vantaggi** __precedenti__
                    ᲼᲼᲼↪ Inviare **media** in **__ogni__ chat**
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1142880333151346729>
                    ᲼᲼᲼↪ Tutti i **vantaggi** __precedenti__
                    ᲼᲼᲼↪ **__Bypass__** dei **requisiti** nei __giveaway__
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1142880436792610886>
                    ᲼᲼᲼↪ **Ruolo apposito**
                    ᲼᲼᲼↪ Tutti i **vantaggi** __precedenti__
                    ᲼᲼᲼↪ Ruolo **__personalizzato__**
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1143624343482552460>
                    ᲼᲼᲼↪ **Ruolo apposito**
                    ᲼᲼᲼↪ Tutti i **vantaggi** __precedenti__
                    ᲼᲼᲼↪ Canale **vocale __privato__**
                
                <:PM_White_Dot:1147944922159272088> <a:PM_Arrow:1240704950103969927> <@&1143624415184175255>
                    ᲼᲼᲼↪ **Ruolo apposito**
                    ᲼᲼᲼↪ Tutti i **vantaggi** __precedenti__
                    ᲼᲼᲼↪ **Priorità** nei __ticket__ e nelle __candidature__`),

                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Espeon:1159603974538809425>  **__RISCATTA I TUOI PERKS__**`)
                    .setDescription(`<a:PM_Spark:1159597581337378957> Lo **staff** di **__PurpleMoon__** non vi __consegnerà__ automaticamente i **perks**. Dovrete aprire un __ticket__ __**\`PERKS\`**__ per **riscattarli**. Ovviamente questo non vale per **perks** riguardanti i **permessi**, come i **nick** o i **media**.`)
            ]
            await interaction.reply({ embeds: [embeds[0], embeds[1]], ephemeral: true });
        }

        if (interaction.customId == 'member') {

            const embeds = [
                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Diamond:1148914201453142076> **__Members Of The Week__**`)
                    .setDescription(`<:PM_White_Dot:1147944922159272088> Al concludersi della settimana verrano conferiti dei premi al __membro più attivo all'interno delle chat testuali e delle chat vocali__, da considerarsi validi per tutta la durata della settimana seguente!
                
                <:PM_writer:1240607708370042892> <@&1217951780990881922>
                    ᲼᲼᲼↪ Moltiplicatore \`10%\` globale
                    ᲼᲼᲼↪ Possibilità di creare un emoji custom
                    ᲼᲼᲼↪ Possibilità di ottenere una reazione quando si viene taggati

                <:PM_vocalist:1240607746597060628> <@&1217951956157337632>
                    ᲼᲼᲼↪ Moltiplicatore \`10%\` globale
                    ᲼᲼᲼↪ Possibilità di creare una soundboard a scelta
                    ᲼᲼᲼↪ Possibilità di ottenere una reazione quando si viene taggati

                <a:PM_Punto:1159603819752194099> **__\`nel caso l'utente uscisse dal server i ruoli saranno rimossi\`__**`),

                new EmbedBuilder()
                    .setColor('#e1c4ff')
                    .setTitle(`<a:PM_Espeon:1159603974538809425>  **__RISCATTA I TUOI PERKS__**`)
                    .setDescription(`<a:PM_Spark:1159597581337378957> Lo **staff** di **__PurpleMoon__** non vi __consegnerà__ automaticamente i **perks**. Dovrete aprire un __ticket__ __**\`PERKS\`**__ per **riscattarli**. Ovviamente questo non vale per **perks** riguardanti i **permessi**, come i **nick** o i **media**.`)
            ]
            await interaction.reply({ embeds: [embeds[0], embeds[1]], ephemeral: true });
        }

        if (interaction.customId == 'trial') {

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`> <:PM_Helper:1240651416863768700> Superando il provino, sarete **pexati** al ruolo di __<@&1143622574463520910>__,
            <a:PM_Hourglass:1148010095398113382> _Effettuerete_ una __prova__ di **__\`una\` settimana__**. Se dimostrerete __attività__, __impegno__ e **__maturità__** sarete promossi al ruoli di __<@&1143622597498634251>__.

            <a:PM_Arrow:1240704950103969927> [Per candidarsi clicca qua.](https://dyno.gg/form/1049247d)`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'partner') {

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`> <a:PM_Partner:1147914265366372543> **Superando** il _provino_, sarete promossi **__direttamente__** al ruolo di __<@&1143604206276726908>__.
            <:PM_PayPal:1240601766702092289> Raggiungendo un numero preciso di **partnership**, potrete ottenere _premi_ come **__\`Nitro Boost\`__** o **denaro** su **__\`PayPal\`__**. Per __ulteriori informazioni__, controllate il canale __<#1252988733506977852>__.

            <a:PM_Arrow:1240704950103969927> [Per candidarsi clicca qua.](https://dyno.gg/form/b022056d)`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.customId == 'event') {

            const embed = new EmbedBuilder()
                .setColor('#e1c4ff')
                .setDescription(`> <:PM_EventManager:1246046502653263882> Se il vostro __provino__ verrà **accettato**, sarete **__promossi__** al ruoli di __<@&1203321216962662480>__. 
            <a:PM_Festa:1159603524116676648> Dove dovrete **creare**, **gestire** e **sistemare** gli __eventi__ che si _svolgeranno_     nel server.

            <a:PM_Arrow:1240704950103969927> [Per candidarsi clicca qua.](https://dyno.gg/form/a7a31595)`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}