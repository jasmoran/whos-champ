import { connect } from 'react-redux';
import { ReduxState, Result } from '../types';
import Leaders from '../components/Leaders';

export function mapStateToProps(state: ReduxState) {
  var rByR = {};
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
                                  region, results
                                }));

  return { resultsByRegion };
}

export default connect(mapStateToProps)(Leaders);
