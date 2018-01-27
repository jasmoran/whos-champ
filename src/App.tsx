import * as React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import './App.css';

import Add from './containers/Add';
import List from './containers/List';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Leaderboard</h1>
          <ul className="nav nav-pills">
            <li><NavLink className="nav-link" exact={true} to="/">Home</NavLink></li>
            <li><NavLink className="nav-link" to="/add">Add</NavLink></li>
          </ul>
          <div className="container">
            <Route exact={true} path="/" component={List} />
            <Route path="/add" component={Add} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
