import { combineReducers } from 'redux';
import resultData from './resultData';
import regionData from './regionData';
import playerData from './playerData';
import loggedIn from './loggedIn';
import location from './location';

const leaderboardApp = combineReducers({
  resultData,
  regionData,
  playerData,
  loggedIn,
  location
});

export default leaderboardApp;
