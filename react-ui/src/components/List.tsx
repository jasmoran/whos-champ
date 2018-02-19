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
      <ListGroupItem key={res._id}>
        {res.winner} won the {res.region} title {date.describe(new Date(res.date))}
      </ListGroupItem>
    ));

    return (
      <ListGroup>
        {results}
      </ListGroup>
    );
  }
}

export default List;
