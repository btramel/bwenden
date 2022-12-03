require("dotenv").config({ path: __dirname + "/.env" });
const espnClient = require('./espnClient.js');
const twitterClient = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const everySecond = "*/1 * * * * *"
const everyHalfHour = "0 */30 * * * *"
            
Promise.all([espnClient, twitterClient, CronJob]).then((values) => {
    espnClient.getStinkers().then((stinker) => {
        const cronTweet = new CronJob(everySecond, async () => {
            const films = [
                "the tree of life",
                "the godfather",
                "the shining",
                "vertigo",
                "do the right thing",
                "seven samurai",
                "mad max fury road",
                "come and see",
                "raging bull",
                "lord of the rings",
            ];
            let filmIndex = Math.floor(Math.random() * films.length)
            let randomFilm = films[filmIndex]

            const quips = [
                " imo.",
                " I guess.", 
                " I suppose.",
                ", but you're also bad at this.", 
                " but you did draft allen robinson.", 
                ", but maybe chase edmonds will be back soon.",
                ", but maybe deon jackson will pop off one day.",
                ", but odds are you'll win a championship every twelve years!",
                ". is there fantasy rocket league?",
                ". have you looked at the waiver wire?",
                " but criterion will always be there for you.",
                `. maybe call it a day and watch ${films[randomFilm]} again?`
            ];
            let quipIndex = Math.floor(Math.random() * quips.length)
            let randomQuip = quips[quipIndex]

            let stinkerIndex = Math.floor(Math.random() * stinker.length)
            let randomStinker = stinker[stinkerIndex]
            
            // TEST
            stinker.length !== 0 
                ? console.log(`sorry about ${randomStinker} jxsn. it's been a weird week${randomQuip}`) 
                : cronTweet.stop()

            stinker.splice(stinkerIndex, 1)
            quips.splice(quipIndex, 1)

            // RUN
            // stinker.length !== 0 
            //     ? await twitterClient.v2.tweet(`sorry about ${randomStinker} jxsn. it's been a weird week${randomQuip} i hope toney scores 35 for you.`)
            //     : cronTweet.stop()
        })
        cronTweet.start()
    });
})