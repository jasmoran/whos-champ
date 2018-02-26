import * as React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import RegionResults from './RegionResults';
import { Result } from '../types';

export interface Props {
  resultsByRegion: { region: string; results: Result[] }[];
}

class Leaders extends React.Component<Props, object> {
  render() {
    const items = this.props.resultsByRegion.map(reg => (
      <RegionResults key={reg.region} region={reg.region} results={reg.results} />
    ));

    return (
      <div>
        <Panel>
          <Panel.Heading>Settlers of Catan</Panel.Heading>
          <ListGroup>
            {items}
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

export default Leaders;
