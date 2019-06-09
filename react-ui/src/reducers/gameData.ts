import { RECEIVE_GAMES, REQUEST_GAMES, GameAction } from '../actions/Games';
import { GameData, Game } from '../types';

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
      const games: {[k: string]: Game} = {};
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
