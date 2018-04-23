import * as React from 'react';
import { Player } from '../types';
import { FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { PlayerListQuery } from '../result-types';
import { query } from '../graphql';
import gql from 'graphql-tag';

export interface Props {
  label: string;
  onChange: (t: Player[]) => void;
  valid: 'error' | null;
}

const QUERY = gql`
  query PlayerList {
    players {
      id
      name
    }
  }`;

const PlayerSelect = (props: Props) => query(QUERY, (data: PlayerListQuery) => (
  <FormGroup validationState={props.valid}>
    <ControlLabel>{props.label}</ControlLabel>
    <Typeahead
      allowNew={true}
      newSelectionPrefix="Add a new person: "
      options={data.players}
      labelKey="name"
      clearButton={true}
      onChange={props.onChange}
    />
    {props.valid && <HelpBlock>You must select a {props.label.toLowerCase()}</HelpBlock>}
  </FormGroup>
));

export default PlayerSelect;
