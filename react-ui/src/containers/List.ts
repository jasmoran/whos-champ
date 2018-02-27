import { connect } from 'react-redux';
import { ReduxState } from '../types';
import List from '../components/List';

export function mapStateToProps(state: ReduxState) {
  return {
    results: Object.values(state.resultData.results)
  };
}

export default connect(mapStateToProps)(List);
