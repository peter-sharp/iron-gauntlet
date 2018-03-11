function gameStore(state, events) {
  state.games = []

  state.events.ADD_GAME = 'addGame'
  state.events.CREATE_GAME = 'createGame'
  events.on(state.events.CREATE_GAME, () => {
    games.push(game)
    events.emit(state.events.RENDER)
  })

  events.on(state.events.ADD_GAME, game => {
    games.push(game)
    events.emit(state.events.RENDER)
  })
}
export default gameStore
