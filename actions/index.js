export function updateGame(payload) {
  return { type: 'UPDATE_GAME', payload };
}

export function makeMove(payload) {
  return { type: 'MAKE_MOVE', payload };
}