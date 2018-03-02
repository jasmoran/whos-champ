export interface Result {
  id: string;
  regions: Region[];
  winner: Player;
  date: Date;
  score: number;
  game: Game;
}

export interface Region {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  short: string;
  name: string;
}

export type ResultSet = {[key: string]: Result};
export type RegionSet = {[key: string]: Region};
export type PlayerSet = {[key: string]: Player};
export type GameSet   = {[key: string]: Game};

export interface FetchedData {
  receivedAt: number;
  updating: boolean;
}

export interface ResultData extends FetchedData {
  results: ResultSet;
}

export interface RegionData extends FetchedData {
  regions: RegionSet;
}

export interface PlayerData extends FetchedData {
  players: PlayerSet;
}

export interface GameData extends FetchedData {
  games: GameSet;
}

export interface ReduxState {
  loggedIn: boolean;
  location: Coordinates | null;
  resultData: ResultData;
  regionData: RegionData;
  playerData: PlayerData;
  gameData:   GameData;
}
