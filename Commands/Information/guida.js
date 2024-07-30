const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const pagination = require('../../Functions/Pagination')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guida')
        .setDescription('Mostra una guida.')
        .addSubcommand(sub =>
            sub.setName('server')
                .setDescription('Mostra una guida sul server.')
        ),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand();
        const embeds = [];

        switch (sub) {
            case 'server':

                var page1 = `<:PM_Flower_Purple:1159603734221946922> Benvenutə nella **guida __ufficiale__** di \`PurpleMoon\`! Qui troverai tutte le **informazioni** non specificate in appositi canali. \n\n > <a:PM_Punto:1159603819752194099> In caso **non** dovessi trovare quello che ti server, verifica che non sia già espresso in dei canali **creati appositamente**. Se non devessero essere __presente__, rivolgiti all'__amministrazione__ aprendo un <#1027909064421806100> **__\`HIGH STAFF\`__**.`;
                var page2 = `<:PM_database:1240596905487241287> I **changelogs** sono usati per _comunicare_ tutti gli **aggiornamenti __minori__** del server. Funzionano tramite il \`ping\` <@&1213971687767285790>, che puoi prendere nel canale <#1134642213100453939>.
                <:PM_White_Dot:1147944922159272088> Potrebbero essere _utilizzati_ anche altri **ping**.`;
                var page3 = `<a:PM_pepe_superexcited:1211306891855274034> Il bot __ufficiale__ di PurpleMoon offre anche dei \`minigames\` all'utenza, utilizzabili **liberamente** ma sempre nei limiti del _regolamento_. Oltre ai comandi di **divertimento**, offre anche dei comandi che potrebbero risultare **__utili__** all'utenza del server.
                \n* \`/avatar\` - Per vedere l'avatar di un utente;
                \n\n * \`/cat\` - Per ottenere una foto di un gatto;
                \n\n * \`/dadjoke\` - Per ottenere una freddura;
                \n\n * \`/dog\` - Per ottenere una foto di un cane;
                \n\n * \`/interazione\` - Potrai interagire con una serie di __azioni__ con un utente;
                \n\n * \`/fliptext\` - Per scrivere un testo flippato;
                \n\n * \`/minigames\` - Per fare dei **minigiochi** con il bot;
                \n\n * \`/role\` - Per ottenere delle informazioni su un ruolo; 
                \n\n * \`/rps\` - Per giocare una partita di Sasso, Carta, Forbice;
                \n\n * \`/server\` - Per ottenere informazioni sul server;
                \n\n * \`/user\` - Per ottenere delle informazioni su un utente.`
                var page4 = `<a:PM_Punto:1159603819752194099> I **suggerimenti** sono effettuati tramite il __nostro__ bot. Il tuo **consiglio** potrà essere effettuato tramite un __comando__, eseguito nell'_apposito canale_, per poi essere **valutato** e **commentato** dallo __staff__ e l'__utenza__. Ricorda di rispettare il **regolamento** e di non effettuare **suggerimenti __inutili__**
                
                <:PM_White_Dot:1147944922159272088> \`/suggest\` - Dai un **__consiglio__** al server! Da effettuare in <#1143905381823828129>.`
                var page5 = `<:PM_eye:1220719868618342492> Il nostro bot __ufficiale__ fornisce inoltre un sistema che sfrutta \`Last.fm\` per visualizare delle **informazioni** sull'ambiente della __musica__.
                \n * \`/import\` - Per impostare il vostro username di [Last.fm](https://www.last.fm/).
                \n\n * \`/fm\` - Per visualizzare la canzone che state ascoltando.
                \n\n * \`/radio\` - Per ascoltare una radio mentre sei in un canale vocale.
                \n\n * \`/top\` - Per visualizzare una top di artisti, canzoni o album che hai ascoltato in un determinato periodo di tempo.
                \n\n * \`/whoknows\` - Per vedere chi conosce la canzone che state ascoltando.
                \n\n * \`pm!fm\` - Per visualizzare la canzone che state ascoltando anche in <#1142078901892427836>.
                \n\n * \`pm!lyrics\` - Per visualizzare il testo di una canzone.`

                for (var i = 0; i < 6; i++) {
                    if (i + 1 == 1) embeds.push(new EmbedBuilder().setColor("#e1c4ff").setDescription(page1).setTitle('<a:PM_Moon:1159603968163446784> **__GUIDA AL SERVER__**'));
                    else if (i + 1 == 2) embeds.push(new EmbedBuilder().setColor("#e1c4ff").setDescription(page2).setTitle('<:PM_api:1240596863674224670> **__CHANGELOGS__**'));
                    else if (i + 1 == 3) embeds.push(new EmbedBuilder().setColor("#e1c4ff").setDescription(page3).setTitle('<:PM_api:1240596863674224670>  **__MINIGAMES & UTILITIES__**'));
                    else if (i + 1 == 4) embeds.push(new EmbedBuilder().setColor("#e1c4ff").setDescription(page4).setTitle('<:PM_api:1240596863674224670>  **__SUGGERIMENTI__**'));
                    else if (i + 1 == 5) embeds.push(new EmbedBuilder().setColor("#e1c4ff").setDescription(page5).setTitle('<a:PM_pepe_party:1211306912625463326> **__MUSIC__**'));
                }

                await pagination(interaction, embeds)
                break;
        }
    }
}