import * as React from 'react';
import { Result } from '../types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import date from '../date';

export interface Props {
  results: Result[];
}

class List extends React.Component<Props, object> {
  render() {
    const results = this.props.results.map((res: Result) => (
      res.regions.map((reg: string) => (
        <ListGroupItem key={res.id + reg}>
          {res.winner.name} won the {reg} title {date.describe(res.date)}
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
