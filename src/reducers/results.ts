import { ADD_RESULT, ResultAction } from '../actions';
import { Result } from '../types';

const results = (state: Result[] = [], action: ResultAction) => {
  switch (action.type) {
    case ADD_RESULT:
      return [...state, {
        region: action.region,
        winner: action.winner,
        date: action.date,
        score: action.score
      }];
    default:
      return state;
  }
};

export default results;
