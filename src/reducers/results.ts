import { ADD_RESULT, ResultAction } from '../actions';
import { ResultSet } from '../types';

const results = (state: ResultSet = {}, action: ResultAction) => {
  switch (action.type) {
    case ADD_RESULT:
      return {...state,
        [action.result._id]: action.result
      };
    default:
      return state;
  }
};

export default results;
