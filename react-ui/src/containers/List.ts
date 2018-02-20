import { connect } from 'react-redux';
import { ReduxState, Result } from '../types';
import List from '../components/List';

export function mapStateToProps(state: ReduxState) {
  return {
    results: Object.values(state.resultData.results).map((res: Result) => {
      if (!state.regionData.receivedAt || !state.playerData.receivedAt) {
        return res;
      }
      
      return {...res,
        regions: res.regions.map(reg => state.regionData.regions[reg].name),
        winner: state.playerData.players[res.winner].name
      };
    })
  };
}

export default connect(mapStateToProps)(List);
