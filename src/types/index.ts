export interface Result {
  region: string;
  winner: number;
  date: string;
  score: number;
}

export interface Region {
  id: string;
  name: string;
}

export interface ReduxState {
  results: Result[];
  regions: {[key: string]: Region};
}
