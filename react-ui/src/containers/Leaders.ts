import { connect } from 'react-redux';
import { ReduxState, Result, Region } from '../types';
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

          res.regions.forEach((reg: Region) => {
            rByR[reg.id] = rByR[reg.id] || [];
            rByR[reg.id].push(res);
          });
        });

  const resultsByRegion = Object.entries(rByR)
                                .map(([region, results]) => ({
                                  region: state.regionData.regions[region],
                                  results: results.sort(compareResults)
                                }));

  return { resultsByRegion };
}

export default connect(mapStateToProps)(Leaders);
