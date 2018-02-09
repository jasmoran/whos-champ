import * as React from 'react';
import { Route, NavLink, Router } from 'react-router-dom';
import './App.css';

import Add from './containers/Add';
import List from './containers/List';
import Login from './containers/Login';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <h1>Who's Champ</h1>
          <ul className="nav nav-pills">
            <li><NavLink className="nav-link" exact={true} to="/">Home</NavLink></li>
            <li><NavLink className="nav-link" to="/add">Add</NavLink></li>
            <li><Login /></li>
          </ul>
          <div className="container">
            <Route exact={true} path="/" component={List} />
            <Route path="/add" component={Add} />
            <Route path="/callback" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
