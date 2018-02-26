import { connect } from 'react-redux';
import { ReduxState, Result } from '../types';
import Leaders from '../components/Leaders';

function compareResults(a: Result, b: Result) {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
}

export function mapStateToProps(state: ReduxState) {
  var rByR: {[k: string]: Result[]} = {};
  Object.values(state.resultData.results)
        .forEach((res: Result) => {
          if (state.playerData.receivedAt) {
            res = {...res, winner: state.playerData.players[res.winner].name };
          }

          res.regions.forEach((reg: string) => {
            if (state.regionData.receivedAt) {
              reg = state.regionData.regions[reg].name;
            }

            rByR[reg] = rByR[reg] || [];
            rByR[reg].push(res);
          });
        });

  const resultsByRegion = Object.entries(rByR)
                                .map(([region, results]) => ({
                                  region,
                                  results: results.sort(compareResults)
                                }));

  return { resultsByRegion };
}

export default connect(mapStateToProps)(Leaders);
