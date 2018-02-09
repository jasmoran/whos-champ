import { SET_AUTH, SetAuth } from '../actions';

const loggedIn = (state: boolean = false, action: SetAuth) => {
  switch (action.type) {
    case SET_AUTH:
      return action.loggedIn;
    default:
      return state;
  }
};

export default loggedIn;
