const { Client } = require('espn-fantasy-football-api/node-dev');

// client
const twelveMan = new Client({ leagueId: 39669613 });
const tenMan = new Client({ leagueId: 1501787134 });
const time = new Date();
let stinkers = [];
let tenManStinkers = [];


const getStinkers = async () => {
    try {
        twelveMan.setCookies({ 
            espnS2: "AEB/SaRywbx9Drs1ZxLRBcr5O8yiXUUrznHHTfv/YUCOVjCrjTy8fsDWg6pr/c8jFEgbKXUCgrB+NMBkbsWm7JbiSKwFmLLyYeDI51bvU+y4tRCob66tThJoh0Qj032mO04mBb9h9PCx4W4U30KZkrCeAw76CbYZNdcUsa0vIB7oq4LGvYj+fcEJ3hv3vbMMk+57i7lIpmjwY4JO+oE+Fh/CGjzdQYRmN5RMYFQNEzp7nDXuTEw4lwAevqDdBOSR3orwkyR8clfVmg3tC58VGS8XilKuI/UbxZbhR8zkECM6crOE5RVWC4ybT8ggvzt+Kwz5XYGMGm2L/udzUx8Ud20t",
            SWID: "{11FB8C5C-FF63-47A1-9DCA-895047792509}",
        })
        tenMan.setCookies({
            espnS2: "AECpuhbJzSQbgl0cF1MhPCek2n2Rl3Twe2i7l1oeZp9IL924ibHiyrIcO95HDckR2fka8x8eIwm2WN9vRc5i5ms%2B%2FFdGpT1YpP27QAdHCEoSSLdAHMxVJ7gPFe7vuD8bov0vtS2x8c3XR0GedYtGrZhgG5DRHdODrKMIrwfjSI0q1LOZyFLoWyKze6Jsw5%2FtQsVdEpklvN7InlE51%2F8PquQLvANcx6xPVOuVzgnLCW7NiICMUSFy%2BcD48Mm3m57y3%2BUf7oXCY2Q2vAi5yd%2FNR8h9jcLFLhxI6%2FDD9phRgqPjIZpFp9kTQt%2FxCiRn0o%2FSgIA%3D",
            SWID: "{11FB8C5C-FF63-47A1-9DCA-895047792509}",
        })
        await twelveMan.getBoxscoreForWeek({ seasonId: 2022, matchupPeriodId: 12, scoringPeriodId: 12, }).then((teams) => {
            teams.filter((scorer) => {
                if (scorer.homeTeamId === 1) {
                    scorer.homeRoster.forEach((player) => {
                        // console.log(player.player)
                        let human = player.player.fullName.toLowerCase();
                        let lastName = player.player.lastName;
                        let points = player.totalPoints;
                        (points > .01 && points < 8 && lastName != 'D/ST') 
                            ? stinkers.push(human) 
                            : stinkers = stinkers;
                        return stinkers
                    })
                } else if (scorer.awayTeamId === 1) {
                    scorer.awayRoster.forEach((player) => {
                        // console.log(player.player)
                        let human = player.player.fullName.toLowerCase();
                        let lastName = player.player.lastName;
                        let points = player.totalPoints;
                        (points > .01 && points < 9 && lastName != 'D/ST') 
                            ? stinkers.push(human) 
                            : stinkers = stinkers;
                        return stinkers
                    })
                }
            })
            // console.log(stinkers)
            return stinkers
            });

        await tenMan.getBoxscoreForWeek({ seasonId: 2022, matchupPeriodId: 12, scoringPeriodId: 12, }).then((teams) => {
            teams.filter((scorer) => {
                if (scorer.homeTeamId === 6) {
                    scorer.homeRoster.forEach((player) => {
                        // console.log(player.player)
                        let human = player.player.fullName.toLowerCase();
                        let lastName = player.player.lastName;
                        let points = player.totalPoints;
                        (points > .01 && points < 8 && lastName != 'D/ST') 
                            ? tenManStinkers.push(human) 
                            : tenManStinkers = tenManStinkers;
                        return tenManStinkers
                    })
                } else if (scorer.awayTeamId === 6) {
                    scorer.awayRoster.forEach((player) => {
                        // console.log(player.player)
                        let human = player.player.fullName.toLowerCase();
                        let lastName = player.player.lastName;
                        let points = player.totalPoints;
                        (points > .01 && points < 9 && lastName != 'D/ST') 
                            ? tenManStinkers.push(human) 
                            : tenManStinkers = tenManStinkers;
                        return tenManStinkers
                    })
                }
            })
            // console.log(tenManStinkers)
            return tenManStinkers
            });

            const allStinkers = stinkers.concat(tenManStinkers)
            console.log(allStinkers)
            return allStinkers


    } catch (e) {
        console.error(e)
    }
}

const twelveManSetup = twelveMan.readOnly;
const tenManSetup = tenMan.readOnly;

module.exports = { twelveManSetup, tenManSetup, getStinkers };