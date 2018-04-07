function getCurrentGame(state) {
  return state.gamesIndexed[state.params.game]
}

function updateCurrentGame(state, game) {
  return state.gamesIndexed[state.params.game] = game
}


function gameStore(state, events) {
  state.games = state.games || []
  state.gamesIndexed = state.gamesIndexed || {}

  state.currentGame = state.currentGame || null

  debugger

  state.events.ADD_GAME           = 'addGame'
  state.events.ADD_PLAYER         = 'addPlayer'
  state.events.CREATE_GAME        = 'createGame'
  state.events.SETUP_NEW_GAME     = 'setupNewGame'
  state.events.JOIN_GAME          = 'joinGame'
  state.events.JOINED_GAME        = 'joinedGame'
  state.events.GAME_CREATED       = 'gameCreated'
  state.events.LOBBY_JOINED       = 'lobbyJoined'
  state.events.GAME_STARTED       = 'gameStarted'
  state.events.UPDATE_MAX_PLAYERS = 'updateMaxPlayers'
  state.events.GAMES              = 'games'

  events.on(state.events.UPDATE_MAX_PLAYERS, maxPlayers => {
    let game = Object.assign({}, state.currentGame)
    game.maxPlayers = maxPlayers
    state.currentGame = game
    events.emit(state.events.RENDER)
  })

  events.on(state.events.ADD_GAME, addGame)

  function addGame (game) {
    state.games.push(game)
    state.gamesIndexed[game.id] = game
  }


}

module.exports = gameStore
