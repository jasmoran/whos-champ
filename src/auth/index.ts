import { WebAuth, Auth0Error, Auth0DecodedHash } from 'auth0-js';
import { History } from 'history';

export default class Auth {
  setAuth: (t: boolean) => void;
  history: History;

  auth0 = new WebAuth({
    domain: 'app86758601.auth0.com',
    clientID: '0LzxQ5Ot1Urt82svjKvm98Co9VAgxwUP',
    redirectUri: 'https://whos-champ.herokuapp.com/callback',
    audience: 'https://app86758601.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err: Auth0Error | null, authResult: Auth0DecodedHash) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setAuth(true);
        this.setSession(authResult);
        this.history.replace('/');
      } else if (err) {
        this.history.replace('/');
        console.error(err);
      }
    });
  }

  setSession = (authResult: Auth0DecodedHash) => {
    if (authResult.expiresIn !== undefined) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken as string);
      localStorage.setItem('id_token', authResult.idToken as string);
      localStorage.setItem('expires_at', expiresAt);
    }

    // navigate to the home route
    this.history.replace('/');
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.setAuth(false);

    // navigate to the home route
    this.history.replace('/');
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiry = localStorage.getItem('expires_at');
    if (expiry) {
      let expiresAt = JSON.parse(expiry);
      return new Date().getTime() < expiresAt;
    } else {
      return false;
    }
  }

  constructor(setAuth: (t: boolean) => void, history: History) {
    setAuth(this.isAuthenticated());
    this.setAuth = setAuth;
    this.history = history;
  }
}
