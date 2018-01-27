import * as React from 'react';

export interface Props {
  label: string;
  value: number;
  onChange: (e: any) => void;
}

class UserSelect extends React.Component<Props, object> {
  users = [
    { id: 0, name: 'Person 0' },
    { id: 1, name: 'Person 1' },
    { id: 2, name: 'Person 2' },
    { id: 3, name: 'Person 3' },
    { id: 4, name: 'Person 4' }
  ];

  render() {
    const users = this.users.map((user: any) =>
      <option key={user.id} value={user.id}>{user.name}</option>
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
              {users}
            </select>
          </label>
        </div>
    );
  }
}

export default UserSelect;
