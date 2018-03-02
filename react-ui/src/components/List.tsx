import * as React from 'react';
import { Result, Region } from '../types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import DateUtil from '../DateUtil';

export interface Props {
  results: Result[];
}

class List extends React.Component<Props, object> {
  render() {
    const results = this.props.results.map((res: Result) => (
      res.regions.map((reg: Region) => (
        <ListGroupItem key={res.id + reg.id}>
          {res.game.short}: {res.winner.name} won the {reg.name} title {DateUtil.describe(res.date)}
        </ListGroupItem>
      ))
    ));

    return (
      <ListGroup>
        {results}
      </ListGroup>
    );
  }
}

export default List;
