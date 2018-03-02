import { RECEIVE_GAMES, REQUEST_GAMES, GameAction } from '../actions/Games';
import { GameData } from '../types';

const gameData = (state: GameData = {
                    games: {},
                    receivedAt: 0,
                    updating: false
                  },
                  action: GameAction) => {
  switch (action.type) {
    case REQUEST_GAMES:
      return {...state, updating: true};
    case RECEIVE_GAMES:
      const games = {};
      action.games.forEach(game => games[game.id] = game);
      return {
        games,
        receivedAt: action.receivedAt,
        updating: false
      };
    default:
      return state;
  }
};

export default gameData;
