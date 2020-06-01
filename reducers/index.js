import { STANDARD } from '../formations';

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
    const cups = action.payload.player === state.name ? copy(state.cups) : copy(state.opponentCups);
    const updatedCups = updateCups(cups, action.payload.row, action.payload.column);
    if (action.payload.player === state.name) {
      return Object.assign({}, state, { cups: updatedCups} );
    } else {
      return Object.assign({}, state, { opponentCups: updatedCups });
    }
  }
  return state;
}

function updateCups(cups, row, column) {
  const newCups = cups.map(cup => {
    if (cup.row === row && cup.column === column) {
        cup.active = !cup.active;
    }
    return cup;
  })
  return newCups;
}

function copy(arr) {
  const newArr = [];
  for (const item of arr) {
    newArr.push(Object.assign({}, item));
  }
  return newArr;
}

export default rootReducer;