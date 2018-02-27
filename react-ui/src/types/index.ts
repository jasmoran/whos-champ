export interface Result {
  id: string;
  regions: Region[];
  winner: Player;
  date: Date;
  score: number;
}

export interface Region {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  name: string;
}

export type ResultSet = {[key: string]: Result};
export type RegionSet = {[key: string]: Region};
export type PlayerSet = {[key: string]: Player};

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

export interface ReduxState {
  loggedIn: boolean;
  resultData: ResultData;
  regionData: RegionData;
  playerData: PlayerData;
}
