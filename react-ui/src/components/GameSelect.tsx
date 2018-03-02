import * as React from 'react';
import { Game } from '../types';
import { FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export interface Props {
  games: Game[];
  label: string;
  value: number;
  onChange: (t: Game[]) => void;
  valid: 'error' | null;
}

class GameSelect extends React.Component<Props, object> {
  render() {
    return (
        <FormGroup validationState={this.props.valid}>
          <ControlLabel>{this.props.label}</ControlLabel>
          <Typeahead
            options={this.props.games}
            labelKey="name"
            clearButton={true}
            onChange={this.props.onChange}
          />
          {this.props.valid && <HelpBlock>You must select a {this.props.label.toLowerCase()}</HelpBlock>}
        </FormGroup>
    );
  }
}

export default GameSelect;
