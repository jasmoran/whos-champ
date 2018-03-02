import * as React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import RegionResults from './RegionResults';
import { Result, Region, Game } from '../types';

export interface Props {
  resultsByRegionByGame: { game: Game, resultsByRegion: { region: Region; results: Result[] }[] }[];
}

class Leaders extends React.Component<Props, object> {
  render() {
    const panels = this.props.resultsByRegionByGame.map(({game, resultsByRegion}) => {
      const items = resultsByRegion.map(reg => (
        <RegionResults key={reg.region.id} region={reg.region.name} results={reg.results} />
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
  }
}

export default Leaders;
