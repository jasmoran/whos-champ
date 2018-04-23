import * as React from 'react';
import { Game } from '../types';
import { FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { GameListQuery } from '../result-types';
import { query } from '../graphql';
import gql from 'graphql-tag';

export interface Props {
  label: string;
  onChange: (t: Game[]) => void;
  valid: 'error' | null;
}

const QUERY = gql`
  query GameList {
    games {
      id
      name
    }
  }`;

const GameSelect = (props: Props) => query(QUERY, (data: GameListQuery) => (
  <FormGroup validationState={props.valid}>
    <ControlLabel>{props.label}</ControlLabel>
    <Typeahead
      options={data.games}
      labelKey="name"
      clearButton={true}
      onChange={props.onChange}
    />
    {props.valid && <HelpBlock>You must select a {props.label.toLowerCase()}</HelpBlock>}
  </FormGroup>
));

export default GameSelect;
