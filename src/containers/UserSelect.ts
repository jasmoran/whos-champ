import { connect } from 'react-redux';
import { ReduxState } from '../types';
import UserSelect from '../components/UserSelect';

export function mapStateToProps(state: ReduxState, ownProps: any) {
  return {
    users: state.users,
    ...ownProps
  };
}

export default connect(mapStateToProps)(UserSelect);
