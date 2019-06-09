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

export type RegionAction = RequestRegions | ReceiveRegions | AddRegion;

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

export const ADD_REGION = 'ADD_REGION';
export type ADD_REGION = typeof ADD_REGION;

export interface AddRegion {
  type: ADD_REGION;
  region: Region;
}

export function addRegion(region: Region): AddRegion {
  fetch(`/api/regions`, {
    method: 'POST',
    body: JSON.stringify(region),
    headers: {
      'Authorization': `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  } as RequestInit);

  return {
    type: ADD_REGION,
    region
  };
}
