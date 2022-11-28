const { Client } = require('espn-fantasy-football-api/node-dev');

// client
const leagueClient = new Client({ leagueId: 39669613 });
let stinkers = [];
const getStinkers = async () => {
    try {
        leagueClient.setCookies({ 
            espnS2: "AEB/SaRywbx9Drs1ZxLRBcr5O8yiXUUrznHHTfv/YUCOVjCrjTy8fsDWg6pr/c8jFEgbKXUCgrB+NMBkbsWm7JbiSKwFmLLyYeDI51bvU+y4tRCob66tThJoh0Qj032mO04mBb9h9PCx4W4U30KZkrCeAw76CbYZNdcUsa0vIB7oq4LGvYj+fcEJ3hv3vbMMk+57i7lIpmjwY4JO+oE+Fh/CGjzdQYRmN5RMYFQNEzp7nDXuTEw4lwAevqDdBOSR3orwkyR8clfVmg3tC58VGS8XilKuI/UbxZbhR8zkECM6crOE5RVWC4ybT8ggvzt+Kwz5XYGMGm2L/udzUx8Ud20t",
            SWID: "{11FB8C5C-FF63-47A1-9DCA-895047792509}",
        })
        await leagueClient.getBoxscoreForWeek({ seasonId: 2022, matchupPeriodId: 12, scoringPeriodId: 12, }).then((teams) => {
            teams.filter((scorer) => {
                if (scorer.homeTeamId === 1) {
                    scorer.homeRoster.forEach((player) => {
                        // console.log(player.player)
                        let human = player.player.lastName;
                        let points = player.totalPoints;
                        (points > .01 && points < 8 && human != 'D/ST') ? stinkers.push(human) : stinkers = stinkers;
                        return stinkers
                    })
                } else if (scorer.awayTeamId === 1) {
                    scorer.awayRoster.forEach((player) => {
                        // console.log(player.player)
                        let human = player.player.lastName;
                        let points = player.totalPoints;
                        (points > .01 && points < 9 && human != 'D/ST') ? stinkers.push(human) : stinkers = stinkers;
                        return stinkers
                    })
                }
            })
            // console.log(stinkers)
            return stinkers
            });

    } catch (e) {
        console.error(e)
    }
    return stinkers
}

const leagueClientSetup = leagueClient.readOnly;

module.exports = { leagueClientSetup, getStinkers };