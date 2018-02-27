import { connect } from 'react-redux';
import { ReduxState, Result } from '../types';
import Leaders from '../components/Leaders';

function compareResults(a: Result, b: Result) {
  return b.date.valueOf() - a.date.valueOf();
}

export function mapStateToProps(state: ReduxState) {
  var rByR: {[k: string]: Result[]} = {};
  Object.values(state.resultData.results)
        .forEach((res: Result) => {
          if (state.playerData.receivedAt) {
            res = {...res, winner: res.winner };
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
