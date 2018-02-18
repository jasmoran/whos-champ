import { connect, Dispatch } from 'react-redux';
// import { ReduxState } from '../types';
import { setAuth } from '../actions';
import { fetchResults } from '../actions/Results';
import { fetchRegions } from '../actions/Regions';
import { fetchPlayers } from '../actions/Players';
import App from '../components/App';

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  const updateData = () => {
    dispatch(fetchResults());
    dispatch(fetchRegions());
    dispatch(fetchPlayers());
  };

  return {
    setAuth: (loggedIn: boolean) => {
      dispatch(setAuth(loggedIn));
      if (loggedIn) {
        updateData();
      }
    },
    updateData
  };
}

export default connect(null, mapDispatchToProps)(App);
