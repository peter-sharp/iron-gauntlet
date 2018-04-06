import game from './game'
import curry from 'lodash/fp/curry'

export function getCurrentGame(state) {
  return state.gamesIndexed[state.params.game]
}

export function updateCurrentGame(state, game) {
  return state.gamesIndexed[state.params.game] = game
}

const startCurrentGame = curry(function (state, events, game) {

  events.emit(state.events.ADD_GAME, game)
  state.currentGame = game;
  events.emit(state.events.PUSHSTATE, `/games/${game.id}`)
})

function gameStore(socket, state, events) {
  state.games = []
  state.gamesIndexed = {}

  state.currentGame = null;

  state.events.ADD_GAME           = 'addGame'
  state.events.CREATE_GAME        = 'createGame'
  state.events.JOIN_GAME          = 'joinGame'
  state.events.JOINED_GAME        = 'joinedGame'
  state.events.GAME_CREATED       = 'gameCreated'
  state.events.UPDATE_MAX_PLAYERS = 'updateMaxPlayers'

  events.on(state.events.CREATE_GAME, function createNewGame() {

    socket.emit(state.events.CREATE_GAME, game({ownerId: state.currentPlayer.id}))
    socket.on(state.events.GAME_CREATED, startCurrentGame(state, events))
  })

  events.on(state.events.JOIN_GAME, function joinGame(id) {
    socket.emit(state.events.JOIN_GAME, id, state.currentPlayer)
    socket.on(state.events.JOINED_GAME, startCurrentGame(state, events))
  })

  events.on(state.events.UPDATE_MAX_PLAYERS, maxPlayers => {
    var game = Object.assign({}, state.currentGame)
    game.maxPlayers = maxPlayers
    state.currentGame = game
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
