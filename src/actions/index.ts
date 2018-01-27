export const ADD_RESULT = 'ADD_RESULT';
export type ADD_RESULT = typeof ADD_RESULT;

export interface AddResult {
  type: ADD_RESULT;
  region: number;
  winner: number;
  date: string;
  score: number;
}

export type ResultAction = AddResult;

export function addResult(region: number, winner: number, date: string, score: number) {
  return {
    type: ADD_RESULT,
    region,
    winner,
    date,
    score
  };
}
