import { connect, Dispatch } from 'react-redux';
import { ReduxState, Result } from '../types';
import { ResultAction, addResult } from '../actions';
import Add from '../components/Add';

export function mapStateToProps(state: ReduxState) {
  return {
    defaultRegion: Object.keys(state.regions)[0],
    defaultWinner: Object.keys(state.users)[0]
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ResultAction>) {
  return {
    newGame: (result: Result) => {
      dispatch(addResult(result));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
