import * as React from 'react';
import { Result } from '../types';
import Trophy from './Trophy';
import CompactList from './CompactList';

export interface Props {
  region: string;
  results: Result[];
}

class RegionResults extends React.Component<Props, object> {
  render() {
    return (
      <div className="grid-2">
        <Trophy text={this.props.region} />
        <div className="centre-vert">
          <CompactList results={this.props.results} />
        </div>
      </div>
    );
  }
}

export default RegionResults;
