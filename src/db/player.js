const Player = require('player')

function getCurrentPlayer () {
  return localStorage.currentPlayer ? Player(JSON.parse(localStorage.currentPlayer)) : false
}

function setCurrentPlayer (player) {
  localStorage.currentPlayer = JSON.stringify(player)
}

function playerStore (state, events) {
  state.currentPlayer = getCurrentPlayer() || Player()
  setCurrentPlayer(state.currentPlayer)

  events.on(state.events.UPDATE_CURRENT_PLAYER, function updateCurrentPlayer(player) {
    state.currentPlayer = player
    setCurrentPlayer(state.currentPlayer)
  })
}

module.exports = playerStore
