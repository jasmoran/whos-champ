import { combineReducers } from 'redux';
import resultData from './resultData';
import regionData from './regionData';
import playerData from './playerData';
import gameData from './gameData';
import loggedIn from './loggedIn';
import location from './location';

const leaderboardApp = combineReducers({
  resultData,
  regionData,
  playerData,
  gameData,
  loggedIn,
  location
} as any);

export default leaderboardApp;
