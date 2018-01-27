import { Result } from '../types';

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

export function addResult(result: Result) {
  return {
    type: ADD_RESULT,
    ...result
  };
}
