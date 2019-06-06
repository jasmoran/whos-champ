import { connect, Dispatch } from 'react-redux';
import { Result, ReduxState, Player } from '../types';
import { ResultAction, addResult } from '../actions/Results';
import Add from '../components/Add';
import { addPlayer } from '../actions/Players';

export function mapStateToProps(state: ReduxState) {
  return {
    location: state.location
  };
}

export function mapDispatchToProps(dispatch: Dispatch<ResultAction>) {
  return {
    newGame: (result: Result) => {
      dispatch(addResult(result));
    },
    newPlayer: (player: Player) => {
      dispatch(addPlayer(player));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
