export interface Result {
  _id: string;
  region: string;
  winner: string;
  date: string;
  score: number;
}

export interface Region {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
}

export type ResultSet = {[key: string]: Result};
export type RegionSet = {[key: string]: Region};
export type UserSet = {[key: string]: User};

export interface ReduxState {
  results: ResultSet;
  regions: RegionSet;
  users: UserSet;
}
