import { Region } from '../types';
import { fetchAPI } from './';

export const REQUEST_REGIONS = 'REQUEST_REGIONS';
export type REQUEST_REGIONS = typeof REQUEST_REGIONS;

export interface RequestRegions {
  type: REQUEST_REGIONS;
}

export function requestRegions(): RequestRegions {
  return {
    type: REQUEST_REGIONS
  };
}

export const RECEIVE_REGIONS = 'RECEIVE_REGIONS';
export type RECEIVE_REGIONS = typeof RECEIVE_REGIONS;

export interface ReceiveRegions {
  type: RECEIVE_REGIONS;
  regions: Region[];
  receivedAt: number;
}

export function receiveRegions(json: Region[]): ReceiveRegions {
  return {
    type: RECEIVE_REGIONS,
    regions: json,
    receivedAt: Date.now()
  };
}

export type RegionAction = RequestRegions | ReceiveRegions;

export function fetchRegions() {
  return function (dispatch: (t: object) => void) {
    // Mark regions as fetching
    dispatch(requestRegions());

    return fetchAPI('regions')
    .then(json =>
      dispatch(receiveRegions(json))
    );
  };
}
