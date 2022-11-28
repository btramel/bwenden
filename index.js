require("dotenv").config({ path: __dirname + "/.env" });
const espnClient = require('./espnClient.js');
const twitterClient = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
            
Promise.all([espnClient, twitterClient, CronJob]).then((values) => {
    espnClient.getStinkers().then((stinker) => {
        const cronTweet = new CronJob("0 30 18 * * *", async () => {
            const quips = [
                " I guess", 
                "",
                " I suppose",
                "",
                " but you're also bad at this", 
                "",
                " but you did draft allen robinson", 
                "",
                " but maybe chase edmonds will be back soon",
                "",
                " but deon jackson will pop off one day",
            ]
            console.log(stinker)
            let randomStinker = stinker[Math.floor(Math.random() * stinker.length)]
            let randomQuip = quips[Math.floor(Math.random() * quips.length)]

            await twitterClient.v2.tweet(`sorry about ${randomStinker} jxsn. it's been a weird week${randomQuip}. i hope toney scores 35 for you.`);
        })
        cronTweet.start()
        cronTweet.stop()
    });
})