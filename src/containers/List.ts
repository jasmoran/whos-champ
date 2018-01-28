import { connect } from 'react-redux';
import { ReduxState, Result } from '../types';
import List from '../components/List';

export function mapStateToProps(state: ReduxState) {
  return {
    results: state.results.map((res: Result) => {
      return {...res,
        region: state.regions[res.region].name,
        winner: state.users[res.winner].name
      };
    })
  };
}

export default connect(mapStateToProps)(List);
