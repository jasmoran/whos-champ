import * as React from 'react';
import { Player } from '../types';
import { FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export interface Props {
  players: Player[];
  label: string;
  value: number;
  onChange: (t: Player[]) => void;
  valid: 'error' | null;
}

class PlayerSelect extends React.Component<Props, object> {
  render() {
    return (
        <FormGroup validationState={this.props.valid}>
          <ControlLabel>{this.props.label}</ControlLabel>
          <Typeahead
            allowNew={true}
            newSelectionPrefix="Add a new person: "
            options={this.props.players}
            labelKey="name"
            clearButton={true}
            onChange={this.props.onChange}
          />
          {this.props.valid && <HelpBlock>You must select a {this.props.label.toLowerCase()}</HelpBlock>}
        </FormGroup>
    );
  }
}

export default PlayerSelect;
