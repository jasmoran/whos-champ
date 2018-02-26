import * as React from 'react';

import { Result, Region, Player } from '../types';

import PlayerSelect from '../containers/PlayerSelect';
import RegionSelect from '../containers/RegionSelect';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { FormGroup } from 'react-bootstrap';

export interface Props {
  newGame: (res: Result) => void;
}

export interface State {
  id?: string;
  regions: Region[];
  winner: Player[];
  date: string;
  score: number;
}

class Add extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      regions: new Array<Region>(),
      winner: new Array<Player>(),
      date: new Date().toISOString().substr(0, 10),
      score: 0
    };
  }

  newGame = (e: any) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 8);
    if (this.state.winner.length === 1) {
      const res = {
        ...this.state,
        id,
        regions: this.state.regions.map(i => i.id),
        winner: this.state.winner[0].id
      };

      this.props.newGame(res);
    }
  }

  regionChange = (value: Region[]) => this.setState({ regions: value });
  winnerChange = (value: Player[]) => this.setState({ winner: value });
  scoreChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ score: parseInt(event.target.value, 10) })
  dateChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ date: event.target.value })

  render() {
    return (
      <form onSubmit={this.newGame}>
        <RegionSelect label="Region" value={this.state.regions} onChange={this.regionChange} />

        <PlayerSelect label="Winner" value={this.state.winner} onChange={this.winnerChange} />

        <FormGroup>
          <label htmlFor="score">Score</label>
          <input className="form-control" type="number" value={this.state.score} onChange={this.scoreChange} />
        </FormGroup>

        <FormGroup>
          <label htmlFor="date">Date of Game</label>
          <input className="form-control" type="date" value={this.state.date} onChange={this.dateChange} />
        </FormGroup>

        <input type="submit" />
      </form>
    );
  }
}

export default Add;
