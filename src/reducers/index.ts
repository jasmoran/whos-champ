import { combineReducers } from 'redux';
import results from './results';
import regions from './regions';
import users from './users';

const leaderboardApp = combineReducers({
  results,
  regions,
  users
});

export default leaderboardApp;
