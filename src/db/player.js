const Player = require('./../player')
const isError = require('lodash/fp/isError')

function getCurrentPlayer () {
  let currentPlayer = safeParseJson(localStorage.currentPlayer)

  return currentPlayer ? Player(currentPlayer) : currentPlayer
}

function safeParseJson(json) {
  let res = null
  if(json) {
    try {
      res = JSON.parse(json)
    } catch (e) {
      console.error(e)
      res = null
    }
  }
  return res
}

function setCurrentPlayer (player) {
  if(player) localStorage.currentPlayer = JSON.stringify(player)
}

function playerStore (state, events) {
  state.events.INITIALIZED_CURRENT_PLAYER = 'initializedCurrentPlayer'
  state.currentPlayer = getCurrentPlayer() || Player()
  events.emit(state.events.INITIALIZED_CURRENT_PLAYER, state.currentPlayer)
  events.on(state.events.UPDATED_CURRENT_PLAYER, function saveCurrentPlayer() {
    setCurrentPlayer(state.currentPlayer)
  })
}

module.exports = playerStore
