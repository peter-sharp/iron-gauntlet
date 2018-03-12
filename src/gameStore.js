import game from './game'

function gameStore(socket, state, events) {
  state.games = []
  var gamesIndexed = {}

  state.events.ADD_GAME = 'addGame'
  state.events.CREATE_GAME = 'createGame'
  state.events.GAME_CREATED = 'gameCreated'
  events.on(state.events.CREATE_GAME, () => {
    socket.emit(state.events.CREATE_GAME, game())
    socket.on(state.events.GAME_CREATED, game => {

      events.emit(state.events.ADD_GAME, game)
    })
  })

  events.on(state.events.ADD_GAME, game => {
    games.push(game)
    gamesIndexed[game.id] = game
    events.emit(state.events.RENDER)
  })
}
export default gameStore
