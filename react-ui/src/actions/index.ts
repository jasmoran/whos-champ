export const SET_AUTH = 'SET_AUTH';
export type SET_AUTH = typeof SET_AUTH;

export interface SetAuth {
  type: SET_AUTH;
  loggedIn: boolean;
}

export function setAuth(loggedIn: boolean): SetAuth {
  return {
    type: SET_AUTH,
    loggedIn
  };
}

export const SET_LOCATION = 'SET_LOCATION';
export type SET_LOCATION = typeof SET_LOCATION;

export interface SetLocation {
  type: SET_LOCATION;
  location: Coordinates;
}

export function setLocation(location: Coordinates): SetLocation {
  return {
    type: SET_LOCATION,
    location
  };
}

export function fetchAPI(endpoint: string) {
  return fetch(`/api/${endpoint}`, { headers: {
    'Authorization': `Bearer ${localStorage.access_token}`,
    'Content-Type': 'application/json'
  }} as RequestInit)
  .then(
    response => response.json(),
    error => console.error(`An error occurred fetching ${endpoint}.`, error)
  );
}

export const generateID = () => Math.random().toString(36).substr(2, 8);