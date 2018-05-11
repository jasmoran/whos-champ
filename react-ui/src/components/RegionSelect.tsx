import * as React from 'react';
import { Region } from '../types';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { RegionListQuery } from '../result-types';
import { query } from '../graphql';
import gql from 'graphql-tag';

export interface Props {
  label: string;
  value: Region[];
  onChange: (t: Region[]) => void;
  valid: 'error' | null;
  gameId: string | undefined;
}

const QUERY = gql`
  query RegionList($gameId: String!) {
    regions(gameId: $gameId) {
      id
      name
    }
  }`;

const RegionSelect = (props: Props) => query(QUERY, (data: RegionListQuery) => (
  <FormGroup validationState={props.valid}>
    <ControlLabel>{props.label}</ControlLabel>
    <Typeahead
      multiple={true}
      allowNew={true}
      newSelectionPrefix="Add a new title: "
      options={data.regions}
      labelKey="name"
      onChange={props.onChange}
      selected={props.value}
    />
    {props.valid && <HelpBlock>You must select at least one {props.label.toLowerCase()}</HelpBlock>}
  </FormGroup>
));

export default RegionSelect;
