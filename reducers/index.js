import { STANDARD } from '../formations';

export const initialState = {
  name: '',
  opponentName: '',
  gameChannel: '',
  UUID: '',
  code: '',
  isTurn: false,
  cups: STANDARD.cups,
  opponentCups: STANDARD.cups
}

function rootReducer(state = initialState, action) {
  if (action.type === 'UPDATE_GAME') {
    return Object.assign({}, state, action.payload);
  }
  return state;
}

export default rootReducer;