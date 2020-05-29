export const initialState = {
  name: '',
  opponentName: '',
  gameChannel: '',
  UUID: '',
  code: ''
}

function rootReducer(state = initialState, action) {
  if (action.type === 'UPDATE_GAME') {
    return Object.assign({}, state, action.payload);
  }
  return state;
}

export default rootReducer;