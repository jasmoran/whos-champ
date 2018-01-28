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

export interface ReduxState {
  results: Result[];
  regions: {[key: string]: Region};
  users: {[key: string]: User};
}
