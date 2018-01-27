import * as React from 'react';

export interface Props {
  label: string;
  value: number;
  onChange: (e: any) => void;
}

class RegionSelect extends React.Component<Props, object> {
  regions = [
    { id: 0, name: 'Wellington' },
    { id: 1, name: 'Auckland' },
    { id: 2, name: 'Napier' },
    { id: 3, name: 'London' },
    { id: 4, name: 'World' }
  ];

  render() {
    const regions = this.regions.map((region: any) =>
      <option key={region.id} value={region.id}>{region.name}</option>
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
