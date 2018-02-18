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
