import { Player } from '../types';
import { updateData } from './';

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

export type PlayerAction = AddPlayer | RequestPlayers | ReceivePlayers;

export function fetchPlayers() {
  return function (dispatch: (t: object) => void) {
    // Mark players as fetching
    dispatch(requestPlayers());

    updateData<Player[]>('players', data => dispatch(receivePlayers(data)))
  };
}

export const ADD_PLAYER = 'ADD_PLAYER';
export type ADD_PLAYER = typeof ADD_PLAYER;

export interface AddPlayer {
  type: ADD_PLAYER;
  player: Player;
}

export function addPlayer(player: Player): AddPlayer {
  fetch(`/api/players`, {
    method: 'POST',
    body: JSON.stringify(player),
    headers: {
      'Authorization': `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  } as RequestInit);

  return {
    type: ADD_PLAYER,
    player
  };
}
