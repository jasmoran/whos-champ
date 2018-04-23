import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';

export const query = <DataType extends any>(q: any, component: (a: DataType) => any) => (
  <Query query={q}>{
    (props: QueryResult<DataType>) => {
      if (props.data === undefined) {
        return <span>Error</span>;
      }
      if (props.loading) {
        return <span>Loading...</span>;
      }
      return component(props.data);
    }
  }</Query>
);