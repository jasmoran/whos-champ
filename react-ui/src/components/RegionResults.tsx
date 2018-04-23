import * as React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import Trophy from './Trophy';
import CompactList, { Result } from './CompactList';

export interface Props {
  region: string;
  results: Result[];
}

export interface State {
  expanded: boolean;
  results: Result[];
}

class RegionResults extends React.Component<Props, State> {
  reducedResults = this.props.results.slice(0, 3);

  constructor(props: Props) {
    super(props);

    this.state = {
      expanded: false,
      results: this.reducedResults
    };
  }

  expand = () => {
    var results = this.props.results;
    if (this.state.expanded) {
      results = this.reducedResults;
    }
    this.setState({
      expanded: !this.state.expanded,
      results
    });
  }

  render() {
    return (
      <ListGroupItem onClick={this.expand}>
        <div className="grid-2">
          <Trophy text={this.props.region} />
          <div className="centre-vert">
            <CompactList results={this.state.results} />
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

export default RegionResults;
