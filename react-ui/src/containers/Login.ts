import { connect } from 'react-redux';
import { ReduxState } from '../types';
import Login from '../components/Login';

export function mapStateToProps(state: ReduxState) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);
