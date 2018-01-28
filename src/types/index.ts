export interface Result {
  region: string;
  winner: string;
  date: string;
  score: number;
}

export interface Region {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
}

export interface ReduxState {
  results: Result[];
  regions: {[key: string]: Region};
  users: {[key: string]: User};
}
