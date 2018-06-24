const Player = require('./player.js')
const MAX_PLAYERS = 8
const MIN_PLAYERS = 2

function playerStore (state, events) {
  state.events.SET_PLAYERS = 'setPlayers';
  state.events.UPDATE_CURRENT_PLAYER = 'updateCurrentPlayer';
  state.events.UPDATED_CURRENT_PLAYER = 'updatedCurrentPlayer';
  state.currentPlayer =  Player()

  events.on(state.events.UPDATE_CURRENT_PLAYER, function updateCurrentPlayer(update) {
    state.currentPlayer = Object.assign(state.currentPlayer, update)
    
    events.emit(state.events.UPDATED_CURRENT_PLAYER, update)
    events.emit(state.events.RENDER)
  })
}

module.exports = playerStore
