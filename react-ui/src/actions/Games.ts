import { Game } from '../types';
import { fetchAPI } from './';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export type REQUEST_GAMES = typeof REQUEST_GAMES;

export interface RequestGames {
  type: REQUEST_GAMES;
}

export function requestGames(): RequestGames {
  return {
    type: REQUEST_GAMES
  };
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export type RECEIVE_GAMES = typeof RECEIVE_GAMES;

export interface ReceiveGames {
  type: RECEIVE_GAMES;
  games: Game[];
  receivedAt: number;
}

export function receiveGames(json: Game[]): ReceiveGames {
  return {
    type: RECEIVE_GAMES,
    games: json,
    receivedAt: Date.now()
  };
}

export type GameAction = RequestGames | ReceiveGames;

export function fetchGames() {
  return function (dispatch: (t: object) => void) {
    // Mark games as fetching
    dispatch(requestGames());

    return fetchAPI('games')
    .then(json =>
      dispatch(receiveGames(json))
    );
  };
}
