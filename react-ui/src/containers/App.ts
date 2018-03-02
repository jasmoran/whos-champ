import { connect, Dispatch } from 'react-redux';
// import { ReduxState } from '../types';
import { setAuth, setLocation } from '../actions';
import { fetchResults } from '../actions/Results';
import { fetchRegions } from '../actions/Regions';
import { fetchPlayers } from '../actions/Players';
import { fetchGames }   from '../actions/Games';
import App from '../components/App';

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  const updateData = () => {
    Promise.all([
              dispatch(fetchPlayers()),
              dispatch(fetchRegions()),
              dispatch(fetchGames())
            ])
           .then(() => dispatch(fetchResults()));
  };

  return {
    setAuth: (loggedIn: boolean) => {
      dispatch(setAuth(loggedIn));
      if (loggedIn) {
        updateData();
      }
    },
    updateData,
    updateLocation: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos: Position) => {
          dispatch(setLocation(pos.coords));
        });
      }
    }
  };
}

export default connect(null, mapDispatchToProps)(App);
