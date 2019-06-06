import { ADD_PLAYER, RECEIVE_PLAYERS, REQUEST_PLAYERS, PlayerAction } from '../actions/Players';
import { PlayerData } from '../types';

const playerData = (state: PlayerData = {
                      players: {},
                      receivedAt: 0,
                      updating: false
                    },
                    action: PlayerAction) => {
  switch (action.type) {
    case ADD_PLAYER:
      return {...state,
        players: {...state.players,
          [action.player.id]: action.player
        }
      };
    case REQUEST_PLAYERS:
      return {...state, updating: true};
    case RECEIVE_PLAYERS:
      const players = {};
      action.players.forEach(player => players[player.id] = player);
      return {
        players,
        receivedAt: action.receivedAt,
        updating: false
      };
    default:
      return state;
  }
};

export default playerData;
