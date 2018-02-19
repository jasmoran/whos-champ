import * as React from 'react';
import { Result } from '../types';
import date from '../date';

export interface Props {
  results: Result[];
}

function CompactList(props: Props) {
  const results = props.results.map((res) => (
    <tr key={res._id}>
      <td>{date.short(new Date(res.date))}</td>
      <td style={{ paddingLeft: '10px' }}>{res.winner}</td>
    </tr>
  ));

  return <table><tbody>{results}</tbody></table>;
}

export default CompactList;
