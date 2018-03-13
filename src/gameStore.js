import game from './game'

function gameStore(socket, state, events) {
  state.games = []
  state.gamesIndexed = {}

  state.events.ADD_GAME = 'addGame'
  state.events.CREATE_GAME = 'createGame'
  state.events.GAME_CREATED = 'gameCreated'
  events.on(state.events.CREATE_GAME, () => {
    socket.emit(state.events.CREATE_GAME, game())
    socket.on(state.events.GAME_CREATED, game => {

      events.emit(state.events.ADD_GAME, game)
      events.emit(state.events.PUSHSTATE, `/games/${game.id}`)
    })
  })

  events.on(state.events.ADD_GAME, game => {
    state.games.push(game)
    state.gamesIndexed[game.id] = game
  })
}
export default gameStore
