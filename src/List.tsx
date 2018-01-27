import * as React from 'react';
import { Result } from './types';

export interface Props {
  results: Result[];
}

class List extends React.Component<Props, object> {
  render() {
    const results = this.props.results.map((res: Result) =>
      <li key={res.date + res.region}>{res.region} - {res.winner}({res.score}) - {res.date}</li>
    );

    return (
      <ul>
        {results}
      </ul>
    );
  }
}

export default List;
