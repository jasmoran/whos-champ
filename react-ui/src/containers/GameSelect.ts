import { connect } from 'react-redux';
import { ReduxState } from '../types';
import GameSelect from '../components/GameSelect';

export function mapStateToProps(state: ReduxState, ownProps: any) {
  return {
    games: Object.values(state.gameData.games),
    ...ownProps
  };
}

export default connect(mapStateToProps)(GameSelect);
