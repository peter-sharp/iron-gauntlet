const Player = require('./player.js')
const MAX_PLAYERS = 8
const MIN_PLAYERS = 2

function playerStore (state, events) {
  state.events.SET_PLAYERS = 'setPlayers';
  state.events.UPDATE_CURRENT_PLAYER = 'updateCurrentPlayer';
  state.currentPlayer =  Player()
}

module.exports = playerStore
