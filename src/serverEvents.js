const Game = require('./game')
const curry = require('lodash/fp/curry')

const enterGameLobby = curry(function (state, events, game) {

  events.emit(state.events.ADD_GAME, game)
  state.currentGame = game
  events.emit(state.events.PUSHSTATE, `/games/${game.id}`)
  events.emit(state.events.LOBBY_JOINED, state.currentGame)
  return state.currentGame
})

/**
 * communicates to server viw given socket
 */
function serverEvents (socket, state, events) {
  state.events.CREATE_GAME = state.events.CREATE_GAME || 'createGame'
  state.events.JOIN_GAME = state.events.JOIN_GAME || 'joinGame'
  state.events.JOINED_GAME = state.events.JOINED_GAME || 'joinedGame'
  state.events.GAMES = state.events.GAMES || 'games'
  state.events.ADD_PLAYER = state.events.ADD_PLAYER || 'addPlayer'
  state.events.LOBBY_JOINED = state.events.LOBBY_JOINED || 'lobbyJoined'

  events.on(state.events.CREATE_GAME, function createNewGame() {
    state.currentGame = Game({ownerId: state.currentPlayer.id})
    events.emit(state.events.SETUP_NEW_GAME, state.currentGame)
    socket.emit(state.events.CREATE_GAME, state.currentGame)
    socket.on(state.events.GAME_CREATED, enterGameLobby(state, events))

  })

  events.on(state.events.JOIN_GAME, function joinGame(id) {
    socket.emit(state.events.JOIN_GAME, id, state.currentPlayer)
    socket.on(state.events.JOINED_GAME, enterGameLobby(state, events))
  })

  socket.on(state.events.GAMES, function updateGames(games) {
    state.games = games
    games.forEach(game => {
      state.gamesIndexed[game.id] = game
    })
    events.emit(state.events.RENDER)
  })

  socket.on(state.events.ADD_PLAYER, function addPlayerToGame(player) {
    state.currentGame = Game.addPlayer(state.currentGame, player)
    events.emit(state.events.RENDER)
  })
}

module.exports = serverEvents
