import * as React from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import './App.css';

import Add from './Add';
import List from './List';

export class Result {
  region: number;
  winner: number;
  date: string;
  score: number;
}

export interface State {
  results: Result[];
}

class App extends React.Component<object, State> {
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
    const renderAdd = (props: any) => {
      return <Add newGame={this.newGame} />;
    };

    const renderList = (props: any) => {
      return <List results={this.state.results} />;
    };

    return (
      <HashRouter>
        <div>
          <h1>Leaderboard</h1>
          <ul className="nav nav-pills">
            <li><NavLink className="nav-link" exact={true} to="/">Home</NavLink></li>
            <li><NavLink className="nav-link" to="/add">Add</NavLink></li>
          </ul>
          <div className="container">
            <Route exact={true} path="/" render={renderList} />
            <Route path="/add" render={renderAdd} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
