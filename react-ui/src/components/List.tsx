import * as React from 'react';
import { ResultListQuery } from '../result-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import DateUtil from '../DateUtil';
import { query } from '../graphql';
import ArrayUtil from '../util/ArrayUtil';

import gql from 'graphql-tag';

const QUERY = gql`
  query ResultList {
    results {
      id,
      date,
      winner {
        name
      },
      regions {
        name
      },
      game {
        short
      }
    }
  }`;

const List = () => query(QUERY, (data: ResultListQuery) => {
  const results = ArrayUtil.compact(data.results).map(res => {
    const plural = res.regions.length > 1 ? 's' : '';
    const date = DateUtil.describe(new Date(res.date));
    const regions = ArrayUtil.compact(res.regions).map(r => r.name).join(', ');
    return (
      <ListGroupItem key={res.id}>
        {res.game.short}: {res.winner.name} won the {regions} title{plural} {date}
      </ListGroupItem>
    );
  });

  return (
    <ListGroup>
      {results}
    </ListGroup>
  );
});

export default List;
