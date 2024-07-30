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
            if (message.content === ("napoli") && message.author.id === '295500038401163264') {
                message.channel.send({
                    content: 'Vaffammoc a mammt a te e tutt a razza toij l muert d scitestramuert quedda grandissim scassat d mammt bastard razz d merda fighj d buttan a murè strunz struscm a cappell tu e quedda buttn d nont e capit facc d stuedc mocc all muert d scutestramuert e tutt l muert ca tann fatt mocc a te mammt attand fratt sort ziant cugint nont e tutt quand m ste capisc mongolò cap d cazz d merd scurnacchiat a murè fighj d zoccl ten chiù corn tu ca queddà scassat e squasciat d mammt bucchinMa fa u cess rttfus bucchin kitemmuort pumaroncessua nguacchiato omm e merd lota pappalasagne pucchiacca rattus sicchio e lota putan strunzacchion chin e corn chin e merda uallera cessa fa nu chinott bucchin strunz ca mamt fa o cess latrin chin e corn munnez capera cessa latrina chella zom nacchennella muor tumor curnut pisciatur cazzon pizzon fa o cess latrin monnezz pagliacc vergogna mur va fai o schif latrin disct in gul fa a putan chin e merd fai o schif mur bastard a murì pigghjt e pall e mocc e muzzca com e pall e ris mannaghj a o cristo credetentone mannagg a uallera e a caldarell l muert e stramuert tuij fa o schif mamt fa e chinott cu nont e ziant e tutt a razza toij chiattillo ncessua nacchennella capera cessa latrina bastard va a pigghjt nu maruzz e pane in bocca mur strunz a murì pezz i cazz ti voghj abbottà Ma mur strunz bucchin kitemmuort muzzarell pumarol cap e cazz arrocchiapampene capera cessa latrina chella zompapereta e mammt chiattillo chiavica chiavt a leng ngul chin e corn kitestramuort kitebbiv facc e cazz fetosa facc e cazz nacchennella ncessua nguacchiato omm e merd lota pappalasagne pucchiacca rattus sicchio e lota soreta è na putan tieni chiù corna tu che ne panaro e maruzze uallera mammt a te e tutt a razza toij strunz trmon pisciatell bastard muor tumor curnut pisciature'
                })
            }
            if (message.content === ("firenze") && message.author.id === '295500038401163264') {
                message.channel.send({content: `
                Poesia per Natale
                
                “Se ni’ mondo esistesse un po’ di bene
                e ognun si honsiderasse suo fratello
                ci sarebbe meno pensieri e meno pene
                e il mondo ne sarebbe assai più bello”
                
                P.P.
                
                (dice, Pierpaolo Pasolini? No, Pietro Pacciani!) ` })
            }
            if (message.content === ("/leave") && message.author.id === '295500038401163264') {
                message.channel.send('**Lorenzo ha quittato il server, tutti i suoi averi sono stati bruciati, il server esploderà tra:**')
                    .then(() => setTimeout(() => message.channel.send('10'), 1000))
                    .then(() => setTimeout(() => message.channel.send('9'), 2000))
                    .then(() => setTimeout(() => message.channel.send('8'), 3000))
                    .then(() => setTimeout(() => message.channel.send('7'), 4000))
                    .then(() => setTimeout(() => message.channel.send('6'), 5000))
                    .then(() => setTimeout(() => message.channel.send('5'), 6000))
                    .then(() => setTimeout(() => message.channel.send('4'), 7000))
                    .then(() => setTimeout(() => message.channel.send('3'), 8000))
                    .then(() => setTimeout(() => message.channel.send('2'), 9000))
                    .then(() => setTimeout(() => message.channel.send('1'), 10000))
                    .then(() => setTimeout(() => message.channel.send(`Ci hai creduto anche? <:PM_KEKW:1147593053838774383>`), 11000));
            }
        } catch (error) {
            console.error(error);
        }
    },
};