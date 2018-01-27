import { connect } from 'react-redux';
import { ReduxState } from '../types';
import List from '../components/List';

export function mapStateToProps(state: ReduxState) {
  return {
    results: state.results
  };
}

export default connect(mapStateToProps)(List);
