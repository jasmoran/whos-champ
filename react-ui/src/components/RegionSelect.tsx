import * as React from 'react';
import { Region } from '../types';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export interface Props {
  regions: Region[];
  label: string;
  value: Region[];
  onChange: (t: Region[]) => void;
  valid: 'error' | null;
}

class RegionSelect extends React.Component<Props, object> {
  render() {
    return (
        <FormGroup validationState={this.props.valid}>
          <ControlLabel>{this.props.label}</ControlLabel>
          <Typeahead
            multiple={true}
            allowNew={true}
            newSelectionPrefix="Add a new title: "
            options={this.props.regions}
            labelKey="name"
            onChange={this.props.onChange}
            selected={this.props.value}
          />
          {this.props.valid && <HelpBlock>You must select at least one {this.props.label.toLowerCase()}</HelpBlock>}
        </FormGroup>
    );
  }
}

export default RegionSelect;
