import { SET_LOCATION, SetLocation } from '../actions';

const location = (state: Coordinates | null = null, action: SetLocation) => {
  switch (action.type) {
    case SET_LOCATION:
      const l = action.location;
      return {
        accuracy: l.accuracy,
        altitude: l.altitude,
        altitudeAccuracy: l.altitudeAccuracy,
        heading: l.heading,
        latitude: l.latitude,
        longitude: l.longitude,
        speed: l.speed
      };
    default:
      return state;
  }
};

export default location;
