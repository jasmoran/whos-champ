import * as React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import RegionResults from './RegionResults';
import { LeaderListQuery } from '../result-types';
import { query } from '../graphql';
import ArrayUtil from '../util/ArrayUtil';

import gql from 'graphql-tag';

const QUERY = gql`
  query LeaderList {
    games {
      id
      name
      regions {
        id
        name
        results {
          id
          date
          winner {
            name
          }
        }
      }
    }
  }`;

const Leaders = () => query(QUERY, (data: LeaderListQuery) => {
  const games = ArrayUtil.compact(data.games);
  const panels = games.map(game => {
    const regions = ArrayUtil.compact(game.regions);
    const items = regions.map(reg => (
      <RegionResults key={reg.id} region={reg.name} results={ArrayUtil.compact(reg.results)} />
    ));

    return (
      <Panel key={game.id}>
        <Panel.Heading>{game.name}</Panel.Heading>
        <ListGroup>
          {items}
        </ListGroup>
      </Panel>
    );
  });

  return <div>{panels}</div>;
});

export default Leaders;