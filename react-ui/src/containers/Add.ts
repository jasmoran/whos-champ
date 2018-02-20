import { connect, Dispatch } from 'react-redux';
import { Result } from '../types';
import { ResultAction, addResult } from '../actions/Results';
import Add from '../components/Add';

export function mapDispatchToProps(dispatch: Dispatch<ResultAction>) {
  return {
    newGame: (result: Result) => {
      dispatch(addResult(result));
    }
  };
}

export default connect(null, mapDispatchToProps)(Add);
