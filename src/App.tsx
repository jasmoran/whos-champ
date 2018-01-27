import * as React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import './App.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import leaderboardApp from './reducers';

import { Result } from './types';

import Add from './containers/Add';
import List from './containers/List';

export interface State {
  results: Result[];
}

class App extends React.Component<object, State> {
  store = createStore(leaderboardApp);

  constructor(props: object) {
    super(props);

    this.state = {
      results: []
    };
  }

  newGame = (res: Result) => {
    this.setState({
      results: [...this.state.results, res]
    });
  }

  render() {
    return (
      <Provider store={this.store}>
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
      </Provider>
    );
  }
}

export default App;
