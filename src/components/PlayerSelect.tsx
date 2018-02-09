import * as React from 'react';
import { Player, PlayerSet } from '../types';

export interface Props {
  players: PlayerSet;
  label: string;
  value: number;
  onChange: (e: any) => void;
}

class PlayerSelect extends React.Component<Props, object> {
  render() {
    const players = Object.values(this.props.players).map((player: Player) =>
      <option key={player._id} value={player._id}>{player.name}</option>
    );

    return (
        <div className="form-group">
          <label>
            {this.props.label}
            <select
              className="form-control"
              value={this.props.value}
              onChange={this.props.onChange}
            >
              {players}
            </select>
          </label>
        </div>
    );
  }
}

export default PlayerSelect;
