import { connect } from 'react-redux';
import { ReduxState } from '../types';
import RegionSelect from '../components/RegionSelect';

export function mapStateToProps(state: ReduxState, ownProps: any) {
  return {
    regions: Object.values(state.regionData.regions),
    ...ownProps
  };
}

export default connect(mapStateToProps)(RegionSelect);
