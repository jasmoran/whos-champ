import * as React from 'react';

import { Result, Region, Player, Game } from '../types';

import PlayerSelect from './PlayerSelect';
import RegionSelect from './RegionSelect';
import GameSelect from './GameSelect';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { FormGroup, Button, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { generateID } from '../actions';
import DateUtil from '../DateUtil';

export interface Props {
  newGame: (res: Result) => void;
  location: Coordinates | null;
}

export interface State {
  id?: string;
  regions: Region[];
  winner: Player[];
  game: Game[];
  date: Date;
  score: number;
  regionValid: 'error' | null;
  winnerValid: 'error' | null;
  gameValid:   'error' | null;
}

class Add extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      regions: new Array<Region>(),
      winner: new Array<Player>(),
      game: new Array<Game>(),
      date: new Date(),
      score: 0,
      regionValid: null,
      winnerValid: null,
      gameValid:   null
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

    if (this.state.game.length !== 1) {
      this.setState({ winnerValid: 'error' });
      invalid = true;
    }

    if (invalid) { return; }

    const id = generateID();
    const res = {
      id,
      regions: this.state.regions,
      winner: this.state.winner[0],
      date: this.state.date,
      score: this.state.score,
      location: this.props.location,
      game: this.state.game[0]
    };

    this.props.newGame(res);
    history.push('/');
  }

  regionChange = (value: Region[]) => this.setState({ regions: value, regionValid: null });
  winnerChange = (value: Player[]) => this.setState({ winner: value, winnerValid: null });
  gameChange   = (value: Game[])   => this.setState({ game: value, gameValid: null });
  scoreChange = (event: any) =>
    this.setState({ score: parseInt(event.target.value, 10) })
  dateChange = (event: any) => {
    const d = DateUtil.fromInput(event.target.value);
    if (!isNaN(d.valueOf())) {
      this.setState({ date: d });
    }
  }

  render() {
    const Submit = withRouter(({ history }) => (
      <Button onClick={this.newGame.bind(null, history)}>Add Game</Button>
    ));

    const selectedGame = this.state.game[0] || {};

    return (
      <form>
        <GameSelect
          label="Game"
          onChange={this.gameChange}
          valid={this.state.gameValid}
        />

        <RegionSelect
          label="Region"
          value={this.state.regions}
          onChange={this.regionChange}
          valid={this.state.regionValid}
          gameId={selectedGame.id}
        />

        <PlayerSelect
          label="Winner"
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
            value={DateUtil.toInput(this.state.date)}
            onChange={this.dateChange}
            max={DateUtil.toInput(new Date())}
          />
          {this.validDate() && <HelpBlock>Date of game can't be in the future</HelpBlock>}
        </FormGroup>

        <Submit />
      </form>
    );
  }
}

export default Add;
