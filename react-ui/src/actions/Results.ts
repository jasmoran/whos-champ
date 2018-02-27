import { Result } from '../types';
import { fetchAPI } from './';

export const ADD_RESULT = 'ADD_RESULT';
export type ADD_RESULT = typeof ADD_RESULT;

export interface AddResult {
  type: ADD_RESULT;
  result: Result;
}

export function addResult(result: Result): AddResult {
  fetch(`/api/results`, {
    method: 'POST',
    body: JSON.stringify(result),
    headers: {
      'Authorization': `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  } as RequestInit);

  return {
    type: ADD_RESULT,
    result
  };
}

export const REQUEST_RESULTS = 'REQUEST_RESULTS';
export type REQUEST_RESULTS = typeof REQUEST_RESULTS;

export interface RequestResults {
  type: REQUEST_RESULTS;
}

export function requestResults(): RequestResults {
  return {
    type: REQUEST_RESULTS
  };
}

export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export type RECEIVE_RESULTS = typeof RECEIVE_RESULTS;

export interface ReceiveResults {
  type: RECEIVE_RESULTS;
  results: Result[];
  receivedAt: number;
}

export function receiveResults(results: Result[]): ReceiveResults {
  return {
    type: RECEIVE_RESULTS,
    results: results,
    receivedAt: Date.now()
  };
}

export const FAILED_RESULTS = 'FAILED_RESULTS';
export type FAILED_RESULTS = typeof FAILED_RESULTS;

export interface FailedResults {
  type: FAILED_RESULTS;
}

export function failedResults(): FailedResults {
  return { type: FAILED_RESULTS };
}

export type ResultAction = AddResult | RequestResults | ReceiveResults | FailedResults;

export function fetchResults() {
  return function (dispatch: (t: object) => void) {
    // Mark results as fetching
    dispatch(requestResults());

    return fetchAPI('results')
    .then(json => {
      if (!(json instanceof Array)) {
        console.error('Received malformed results from server');
        dispatch(failedResults());
        return;
      }

      const results = json.map((res: Result) => ({
        id: res.id,
        regions: res.regions,
        winner: res.winner,
        date: new Date(res.date),
        score: res.score
      }));

      dispatch(receiveResults(results));
    }
    );
  };
}
