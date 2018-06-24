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

  function addGame (game) {
    state.games.push(game)
    state.gamesIndexed[game.id] = game
  }

  function addCreatorToGame(game) {
    game = Game(game)
    game = Game.addPlayer(game, state.currentPlayer)
    state.currentGame = game
  }

  const updatePlayerInGame = curry(function(predicate, update) {
    let game = Game(state.currentGame)
    let i = game.players.findIndex(predicate)
    game.players[i] = Object.assign(game.players[i], update)
    
    state.currentGame = game

    return state.currentGame
  })
  

  events.on(state.events.ADD_GAME, addGame)
  events.on(state.events.SETUP_NEW_GAME, addCreatorToGame)
  events.on(state.events.UPDATED_CURRENT_PLAYER, updatePlayerInGame(player => player.id == state.currentPlayer.id))

}

module.exports = gameStore
