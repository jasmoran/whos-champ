import * as React from 'react';
import { User, UserSet } from '../types';

export interface Props {
  users: UserSet;
  label: string;
  value: number;
  onChange: (e: any) => void;
}

class UserSelect extends React.Component<Props, object> {
  render() {
    const users = Object.values(this.props.users).map((user: User) =>
      <option key={user._id} value={user._id}>{user.name}</option>
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
