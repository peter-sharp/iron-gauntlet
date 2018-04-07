const Player = require('./player.js')
const MAX_PLAYERS = 8
const MIN_PLAYERS = 2

function playerStore (state, events) {
  state.events.SET_PLAYERS = 'setPlayers';
  state.currentPlayer = state.currentPlayer || Player()

  events.on(state.events.SET_PLAYERS, (count) => {
    state.playerCount = count

    events.emit(state.events.RENDER);
  })
}

module.exports = playerStore
