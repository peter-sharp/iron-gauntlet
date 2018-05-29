const Player = require('player')
const isError = require('lodash/fp/isError')

function getCurrentPlayer () {
  let currentPlayer = localStorage.currentPlayer

  if(currentPlayer) {
    try {
      currentPlayer = JSON.parse(localStorage.currentPlayer)
    } catch (e) {
      console.error(e)
      currentPlayer = false
    }
  } else {
    currentPlayer = false
  }

  return currentPlayer ? Player(currentPlayer) : currentPlayer
}

function setCurrentPlayer (player) {
  if(player) localStorage.currentPlayer = JSON.stringify(player)
}

function playerStore (state, events) {
  state.currentPlayer = getCurrentPlayer() || Player()
  events.on(state.events.UPDATED_CURRENT_PLAYER, function saveCurrentPlayer() {
    setCurrentPlayer(state.currentPlayer)
  })
}

module.exports = playerStore
