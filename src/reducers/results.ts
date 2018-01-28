import { ADD_RESULT, ResultAction } from '../actions';
import { Result } from '../types';

const results = (state: Result[] = [], action: ResultAction) => {
  switch (action.type) {
    case ADD_RESULT:
      return [...state, action.result];
    default:
      return state;
  }
};

export default results;
