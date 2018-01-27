import * as React from 'react';

import { Result } from './types';

import UserSelect from './components/UserSelect';
import RegionSelect from './components/RegionSelect';

// export interface State {
//   winner: number;
// }

export interface Props {
  newGame: (res: Result) => void;
}

class Add extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.state = {
      region: 0,
      winner: 0,
      date: new Date().toISOString().substr(0, 10),
      score: 0
    };
  }

  newGame = (e: any) => {
    e.preventDefault();
    this.props.newGame(this.state as Result);
  }

  onChange = (prop: string) => {
    return (e: any) => {
      this.setState({ [prop]: e.target.value });
    };
  }

  render() {
    return (
      <form onSubmit={this.newGame}>
        <RegionSelect label="Region" value={this.state.region} onChange={this.onChange('region')} />

        <UserSelect label="Winner" value={this.state.winner} onChange={this.onChange('winner')} />

        <div className="form-group">
          <label htmlFor="score">Score</label>
          <input className="form-control" type="number" value={this.state.score} onChange={this.onChange('score')} />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date of Game</label>
          <input className="form-control" type="date" value={this.state.date} onChange={this.onChange('date')} />
        </div>

        <input type="submit" />
      </form>
    );
  }
}

export default Add;
