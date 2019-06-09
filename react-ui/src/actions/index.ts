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

export function updateData<T>(endpoint: string, doUpdate: (data: T) => void) {
  const dataUrl = `/api/${endpoint}`;
  let gotNetworkData = false;

  // Get data from API
  fetch(`${dataUrl}?cacheBuster=${Date.now()}`, {
    cache: 'no-cache',
    headers: {
      'Authorization': `Bearer ${localStorage.access_token}`,
      'Content-Type': 'application/json'
    }
  } as RequestInit).then(async res => {
    // Response can only be used once so we need to clone it
    var resClone = res.clone();

    try {
      // Read the response as json
      const data = await res.json();

      // Save response in cache
      caches.open(cacheName).then(cache => cache.put(dataUrl, resClone));
  
      // Perform update
      gotNetworkData = true;
      doUpdate(data);
      console.log(`Updated ${endpoint} from API`);
    } catch (e) {
      console.error(`Failed to update ${endpoint} from API: Got ${e}`);
    }
  });

  // Get cached data
  const cacheName = 'whos-champ-data';
  caches.open(cacheName).then(async cache => {
    try {
      const res = await cache.match(dataUrl);
      
      if (res) {
        // Read the response as json
        const data = await res.json();

        // Perform update unless API returned first
        if (!gotNetworkData) {
          doUpdate(data);
          console.log(`Updated ${endpoint} from cache`);
        }
      }
    } catch (e) {
      console.error(`Failed to update ${endpoint} from cache: Got ${e}`);
    }
  });
}

export const generateID = () => Math.random().toString(36).substr(2, 8);