import { combineReducers } from 'redux';
import results from './results';
import regions from './regions';

const leaderboardApp = combineReducers({
  results,
  regions
});

export default leaderboardApp;
