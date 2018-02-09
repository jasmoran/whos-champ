import { connect, Dispatch } from 'react-redux';
import { ReduxState } from '../types';
import { setAuth } from '../actions';
import { fetchResults } from '../actions/Results';
import { fetchRegions } from '../actions/Regions';
import { fetchPlayers } from '../actions/Players';
import Login from '../components/Login';

export function mapStateToProps(state: ReduxState) {
  return {
    loggedIn: state.loggedIn
  };
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    setAuth: (loggedIn: boolean) => {
      dispatch(setAuth(loggedIn));
    },
    updateData: () => {
      dispatch(fetchResults());
      dispatch(fetchRegions());
      dispatch(fetchPlayers());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
