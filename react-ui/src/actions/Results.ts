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

export function receiveResults(json: Result[]): ReceiveResults {
  return {
    type: RECEIVE_RESULTS,
    results: json,
    receivedAt: Date.now()
  };
}

export type ResultAction = AddResult | RequestResults | ReceiveResults;

export function fetchResults() {
  return function (dispatch: (t: object) => void) {
    // Mark results as fetching
    dispatch(requestResults());

    return fetchAPI('results')
    .then(json =>
      dispatch(receiveResults(json))
    );
  };
}
