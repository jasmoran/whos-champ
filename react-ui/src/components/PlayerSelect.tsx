import * as React from 'react';
import { Player } from '../types';
import { FormGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export interface Props {
  players: Player[];
  label: string;
  value: number;
  onChange: (t: Player[]) => void;
}

class PlayerSelect extends React.Component<Props, object> {
  render() {
    return (
        <FormGroup>
          <label>{this.props.label}</label>
          <Typeahead
            allowNew={true}
            newSelectionPrefix="Add a new person: "
            options={this.props.players}
            labelKey="name"
            clearButton={true}
            onChange={this.props.onChange}
          />
        </FormGroup>
    );
  }
}

export default PlayerSelect;
