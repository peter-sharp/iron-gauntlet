import game from './game'

export function getCurrentGame(state) {
  return state.gamesIndexed[state.params.game]
}

export function updateCurrentGame(state, game) {
  return state.gamesIndexed[state.params.game] = game
}

function gameStore(socket, state, events) {
  state.games = []
  state.gamesIndexed = {}

  state.events.ADD_GAME = 'addGame'
  state.events.CREATE_GAME = 'createGame'
  state.events.JOIN_GAME = 'joinGame'
  state.events.JOINED_GAME = 'joinedGame'
  state.events.GAME_CREATED = 'gameCreated'
  state.events.UPDATE_MAX_PLAYERS = 'updateMaxPlayers'

  events.on(state.events.CREATE_GAME, function createNewGame() {

    socket.emit(state.events.CREATE_GAME, game({ownerId: state.currentPlayer.id}))
    socket.on(state.events.GAME_CREATED, game => {

      events.emit(state.events.ADD_GAME, game)
      events.emit(state.events.PUSHSTATE, `/games/${game.id}`)
    })
  })

  events.on(state.events.JOIN_GAME, function joinGame(id) {
    socket.emit(state.events.JOIN_GAME, id, state.currentPlayer)
    socket.on(state.events.JOINED_GAME, game => {

      events.emit(state.events.ADD_GAME, game)
      events.emit(state.events.PUSHSTATE, `/games/${game.id}`)
    })
  })

  events.on(state.events.UPDATE_MAX_PLAYERS, maxPlayers => {
    var game = Object.assign({}, getCurrentGame(state))
    game.maxPlayers = maxPlayers
    updateCurrentGame(state, game)
    events.emit(state.events.RENDER)
  })

  events.on(state.events.ADD_GAME, addGame)

  function addGame (game) {
    state.games.push(game)
    state.gamesIndexed[game.id] = game
  }

  socket.on('games', function updateGames(games) {
    state.games = games
    games.forEach(game => {
      state.gamesIndexed[game.id] = game
    })
    events.emit(state.events.RENDER)
  })
}
export default gameStore
