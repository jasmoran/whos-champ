export interface Result {
  region: number;
  winner: number;
  date: string;
  score: number;
}

export interface ReduxState {
  results: Result[];
}
