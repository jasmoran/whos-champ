import * as React from 'react';
import { Region } from '../types';

export interface Props {
  regions: {[key: string]: Region};
  label: string;
  value: number;
  onChange: (e: any) => void;
}

class RegionSelect extends React.Component<Props, object> {
  render() {
    const regions = Object.values(this.props.regions).map((region: Region) =>
      <option key={region._id} value={region._id}>{region.name}</option>
    );

    return (
        <div className="form-group">
          <label>
            {this.props.label}
            <select
              className="form-control"
              value={this.props.value}
              onChange={this.props.onChange}
            >
              {regions}
            </select>
          </label>
        </div>
    );
  }
}

export default RegionSelect;
