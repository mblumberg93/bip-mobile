import { STANDARD, FORMATIONS } from '../formations';

export const initialState = {
  name: '',
  opponentName: '',
  code: '',
  cups: STANDARD.cups,
  opponentCups: STANDARD.cups,
  formation: STANDARD.value,
  gameDB: ''
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
  if (action.type === 'RERACK') {
    const cups = FORMATIONS.filter(formation => formation.value == action.payload.formation)[0].cups;
    if (action.payload.player === state.name) {
      return Object.assign({}, state, { cups: cups} );
    } else {
      return Object.assign({}, state, { opponentCups: cups });
    }
  }
  if (action.type === 'RESET') {
    const resetValues = { cups: STANDARD.cups, opponentCups: STANDARD.cups, formation: STANDARD.value }
    return Object.assign({}, state, resetValues);
  }
  if (action.type === 'QUIT') {
    return Object.assign({}, state, initialState);
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