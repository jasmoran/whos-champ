import * as React from 'react';

import { Result, Region, Player } from '../types';

import PlayerSelect from '../containers/PlayerSelect';
import RegionSelect from '../containers/RegionSelect';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { FormGroup, Button, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { generateID } from '../actions';
import date from '../date';

export interface Props {
  newGame: (res: Result) => void;
}

export interface State {
  id?: string;
  regions: Region[];
  winner: Player[];
  date: Date;
  score: number;
  regionValid: 'error' | null;
  winnerValid: 'error' | null;
}

class Add extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      regions: new Array<Region>(),
      winner: new Array<Player>(),
      date: new Date(),
      score: 0,
      regionValid: null,
      winnerValid: null 
    };
  }

  validDate = () => {
    if (isNaN(this.state.date.valueOf())) { return 'error'; }
    return (this.state.date > new Date()) ? 'error' : null;
  }

  newGame = (history: History) => {
    var invalid = false;

    if (this.validDate()) { invalid = true; }

    if (this.state.regions.length < 1) {
      this.setState({ regionValid: 'error' });
      invalid = true;
    }

    if (this.state.winner.length !== 1) {
      this.setState({ winnerValid: 'error' });
      invalid = true;
    }

    if (invalid) { return; }

    const id = generateID();
    const res = {
      ...this.state,
      id,
      regions: this.state.regions.map(i => i.id),
      winner: this.state.winner[0].id
    };
    delete res.regionValid;
    delete res.winnerValid;

    this.props.newGame(res);
    history.push('/');
  }

  regionChange = (value: Region[]) => this.setState({ regions: value, regionValid: null });
  winnerChange = (value: Player[]) => this.setState({ winner: value, winnerValid: null });
  scoreChange = (event: any) =>
    this.setState({ score: parseInt(event.target.value, 10) })
  dateChange = (event: any) => {
    const d = new Date(event.target.value);
    if (!isNaN(d.valueOf())) {
      this.setState({ date: d });
    }
  }

  render() {
    const Submit = withRouter(({ history }) => (
      <Button onClick={this.newGame.bind(null, history)}>Add Game</Button>
    ));

    return (
      <form>
        <RegionSelect
          label="Region"
          value={this.state.regions}
          onChange={this.regionChange}
          valid={this.state.regionValid}
        />

        <PlayerSelect
          label="Winner"
          value={this.state.winner}
          onChange={this.winnerChange}
          valid={this.state.winnerValid}
        />

        <FormGroup style={{ display: 'none' }}>
          <ControlLabel>Score</ControlLabel>
          <FormControl
            type="number"
            value={this.state.score}
            onChange={this.scoreChange}
          />
        </FormGroup>

        <FormGroup validationState={this.validDate()}>
          <ControlLabel>Date of Game</ControlLabel>
          <FormControl
            type="date"
            value={date.toInput(this.state.date)}
            onChange={this.dateChange}
            max={date.toInput(new Date())}
          />
          {this.validDate() && <HelpBlock>Date of game can't be in the future</HelpBlock>}
        </FormGroup>

        <Submit />
      </form>
    );
  }
}

export default Add;
