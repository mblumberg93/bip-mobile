import { STANDARD } from '../formations';
import { makeMove } from '../actions';

export const initialState = {
  name: '',
  opponentName: '',
  gameChannel: '',
  UUID: '',
  code: '',
  cups: STANDARD.cups,
  opponentCups: STANDARD.cups
}

function rootReducer(state = initialState, action) {
  if (action.type === 'UPDATE_GAME') {
    return Object.assign({}, state, action.payload);
  }
  if (action.type === 'MAKE_MOVE') {
    console.log(action);
    const cups = action.payload.player === state.name ? [...state.cups] : [...state.opponentCups];
    const updatedCups = updateCups(cups, action.payload.row, action.payload.column);
    console.log(updatedCups);
    if (action.payload.player === state.name) {
      return Object.assign({}, state, { cups: updatedCups} );
    } else {
      return Object.assign({}, state, { opponentCups: updatedCups });
    }
  }
  return state;
}

function updateCups(cups, row, column) {
  cups = cups.map(cup => {
    if (cup.row === row && cup.column === column) {
        cup.active = !cup.active;
    }
    return cup;
  })
  return cups;
}

export default rootReducer;