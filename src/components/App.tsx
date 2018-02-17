import * as React from 'react';
import { Route, NavLink, Router } from 'react-router-dom';

import Auth from '../auth';

import Add from '../containers/Add';
import List from '../containers/List';
import Login from '../containers/Login';
import Loading from './Loading';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

export interface Props {
  setAuth: (t: boolean) => void;
  updateData: () => void;
}

class App extends React.Component<Props> {
  auth: Auth;

  constructor(props: Props) {
    super(props);
    this.auth = new Auth(props.setAuth, history);
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <h1>Who's Champ</h1>
          <ul className="nav nav-pills">
            <li><NavLink className="nav-link" exact={true} to="/">Home</NavLink></li>
            <li><NavLink className="nav-link" to="/add">Add</NavLink></li>
            <li><Login login={this.auth.login} logout={this.auth.logout} /></li>
          </ul>
          <div className="container">
            <Route exact={true} path="/" component={List} />
            <Route path="/add" component={Add} />
            <Route
              path="/callback"
              render={() => {
                if (/access_token|id_token|error/.test(window.location.hash)) {
                  this.auth.handleAuthentication();
                }
                return <Loading />;
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
