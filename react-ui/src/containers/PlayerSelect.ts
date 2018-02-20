import { connect } from 'react-redux';
import { ReduxState } from '../types';
import PlayerSelect from '../components/PlayerSelect';

export function mapStateToProps(state: ReduxState, ownProps: any) {
  return {
    players: Object.values(state.playerData.players),
    ...ownProps
  };
}

export default connect(mapStateToProps)(PlayerSelect);
