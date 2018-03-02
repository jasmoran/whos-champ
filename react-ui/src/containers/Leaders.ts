import { connect } from 'react-redux';
import { ReduxState, Result, Region } from '../types';
import Leaders from '../components/Leaders';

function compareResults(a: Result, b: Result) {
  return b.date.valueOf() - a.date.valueOf();
}

export function mapStateToProps(state: ReduxState) {
  var rByRByG: {[g: string]: {[r: string]: Result[]}} = {};
  Object.values(state.resultData.results)
        .forEach((res: Result) => {
          if (state.playerData.receivedAt) {
            res = {...res, winner: res.winner };
          }

          const gId = res.game.id;
          res.regions.forEach((reg: Region) => {
            rByRByG[gId] = rByRByG[gId] || {};
            rByRByG[gId][reg.id] = rByRByG[gId][reg.id] || [];
            rByRByG[gId][reg.id].push(res);
          });
        });

  const resultsByRegionByGame = Object.entries(rByRByG)
                                      .map(([game, rByR]) => ({
                                        game: state.gameData.games[game],
                                        resultsByRegion: Object.entries(rByR).map(([region, results]) => ({
                                          region: state.regionData.regions[region],
                                          results: results.sort(compareResults)
                                        }))
                                      }));

  return { resultsByRegionByGame };
}

export default connect(mapStateToProps)(Leaders);
