import * as React from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import RegionResults from './RegionResults';

export interface Props {
}

class Leaders extends React.Component<Props, object> {
  render() {
    const res = Array(8).fill({
      _ix: '',
      region: 'Auckland',
      winner: 'Person',
      date: '2018-02-26',
      score: 5
    });
    res.forEach((v, ix) => v.id += ix);

    return (
      <div>
        <Panel>
          <Panel.Heading>Settlers of Catan</Panel.Heading>
          <ListGroup>
            <ListGroupItem>
              <RegionResults region="World" results={res.slice(0, 2)} />
            </ListGroupItem>
            <ListGroupItem>
              <RegionResults region="Whanganui" results={res.slice(0, 3)} />
            </ListGroupItem>
            <ListGroupItem>
              <RegionResults region="Auckland" results={res.slice(0, 1)} />
            </ListGroupItem>
          </ListGroup>
        </Panel>
        <Panel>
          <Panel.Heading>500</Panel.Heading>
          <ListGroup>
            <ListGroupItem>World: Tony today</ListGroupItem>
            <ListGroupItem>Wanganui: Tony today</ListGroupItem>
            <ListGroupItem>Auckland: Rachel 2 weeks ago</ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

export default Leaders;
