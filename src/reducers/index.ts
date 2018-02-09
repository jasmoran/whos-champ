import { combineReducers } from 'redux';
import resultData from './resultData';
import regionData from './regionData';
import playerData from './playerData';
import loggedIn from './loggedIn';

const leaderboardApp = combineReducers({
  resultData,
  regionData,
  playerData,
  loggedIn
});

export default leaderboardApp;
