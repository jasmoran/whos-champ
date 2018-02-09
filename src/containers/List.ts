import { connect } from 'react-redux';
import { ReduxState, Result } from '../types';
import List from '../components/List';

export function mapStateToProps(state: ReduxState) {
  return {
    results: Object.values(state.resultData.results).map((res: Result) => {
      return {...res,
        region: state.regionData.regions[res.region].name,
        winner: state.playerData.players[res.winner].name
      };
    })
  };
}

export default connect(mapStateToProps)(List);
