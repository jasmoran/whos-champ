import { Player } from '../types';
import { fetchAPI } from './';

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export type REQUEST_PLAYERS = typeof REQUEST_PLAYERS;

export interface RequestPlayers {
  type: REQUEST_PLAYERS;
}

export function requestPlayers(): RequestPlayers {
  return {
    type: REQUEST_PLAYERS
  };
}

export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export type RECEIVE_PLAYERS = typeof RECEIVE_PLAYERS;

export interface ReceivePlayers {
  type: RECEIVE_PLAYERS;
  players: Player[];
  receivedAt: number;
}

export function receivePlayers(json: Player[]): ReceivePlayers {
  return {
    type: RECEIVE_PLAYERS,
    players: json,
    receivedAt: Date.now()
  };
}

export type PlayerAction = RequestPlayers | ReceivePlayers;

export function fetchPlayers() {
  return function (dispatch: (t: object) => void) {
    // Mark players as fetching
    dispatch(requestPlayers());

    return fetchAPI('players')
    .then(json =>
      dispatch(receivePlayers(json))
    );
  };
}
