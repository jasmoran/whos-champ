import { ADD_RESULT, RECEIVE_RESULTS, REQUEST_RESULTS, FAILED_RESULTS, ResultAction } from '../actions/Results';
import { ResultData, Result } from '../types';

const resultData = (state: ResultData = {
                      results: {},
                      receivedAt: 0,
                      updating: false
                    },
                    action: ResultAction) => {
  switch (action.type) {
    case ADD_RESULT:
      return {...state,
        results: {...state.results,
          [action.result.id]: action.result
        }
      };
    case REQUEST_RESULTS:
      return {...state, updating: true};
    case RECEIVE_RESULTS:
      const results: {[k: string]: Result} = {};
      action.results.forEach(result => results[result.id] = result);
      return {
        results,
        receivedAt: action.receivedAt,
        updating: false
      };
    case FAILED_RESULTS:
      return {...state, updating: false};
    default:
      return state;
  }
};

export default resultData;
