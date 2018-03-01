import { connect, Dispatch } from 'react-redux';
import { Result, ReduxState } from '../types';
import { ResultAction, addResult } from '../actions/Results';
import Add from '../components/Add';

export function mapStateToProps(state: ReduxState) {
  return {
    location: state.location
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
