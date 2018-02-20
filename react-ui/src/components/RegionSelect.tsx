import * as React from 'react';
import { Region } from '../types';
import { FormGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export interface Props {
  regions: Region[];
  label: string;
  value: Region[];
  onChange: (t: Region[]) => void;
}

class RegionSelect extends React.Component<Props, object> {
  render() {
    return (
        <FormGroup>
          <label>{this.props.label}</label>
          <Typeahead
            multiple={true}
            allowNew={true}
            newSelectionPrefix="Add a new title: "
            options={this.props.regions}
            labelKey="name"
            onChange={this.props.onChange}
            selected={this.props.value}
          />
        </FormGroup>
    );
  }
}

export default RegionSelect;
