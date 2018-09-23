const Game = require('./game')
const curry = require('lodash/fp/curry')

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

  state.readyButtonEnabled = canEnableReadyButton(state)

  state.events.PLAYER_READY       = 'playerReady'
  state.events.ADD_GAME           = 'addGame'
  state.events.ADD_PLAYER         = 'addPlayer'
  state.events.CREATE_GAME        = 'createGame'
  state.events.SETUP_NEW_GAME     = 'setupNewGame'
  state.events.JOIN_GAME          = 'joinGame'
  state.events.JOINED_GAME        = 'joinedGame'
  state.events.GAME_CREATED       = 'gameCreated'
  state.events.LOBBY_JOINED       = 'lobbyJoined'
  state.events.GAME_STARTED       = 'gameStarted'
  state.events.UPDATE_CURRENT_GAME = 'updateCurrentGame'
  state.events.GAMES              = 'games'
  state.events.CURRENT_GAME_UPDATED = 'currentGameUpdated'


  events.on(state.events.CURRENT_GAME_UPDATED, updateReadyButtonEnabled)
  events.on(state.events.UPDATE_CURRENT_GAME, update => {
    let game = Object.assign({}, state.currentGame, update)
    state.currentGame = game
    events.emit(state.events.CURRENT_GAME_UPDATED)
    events.emit(state.events.RENDER)
  })

  function addGame (game) {
    state.games.push(game)
    state.gamesIndexed[game.id] = game
  }

  function addCreatorToGame(game) {
    game = Game(game)
    game = Game.addPlayer(game, state.currentPlayer)
    state.currentGame = game
  }

  function updateReadyButtonEnabled() {
    state.readyButtonEnabled = canEnableReadyButton(state)
  }


  events.on(state.events.ADD_GAME, addGame)
  events.on(state.events.SETUP_NEW_GAME, addCreatorToGame)

}

function canEnableReadyButton(state) {
  let game = state.currentGame

  return (game &&
          game.maxPlayers == game.players.length &&
         game.title &&
         state.mapVote !== null)
}

module.exports = gameStore
