const tinycolor  = require('tinycolor2')
const uuid = require('uuid/v4')


function Player(state = {}) {
  let {id, name, colour, role, gameId, gameState} = state
  if(!(this instanceof Player)) {
    return new Player(state)
  }

  this.id = id || uuid(),
  this.name = name || '',
  this.colour = colour || getDefaultColour(this.id),
  this.role = role || 'player'
  this.gameId = gameId || null
  this.gameState = gameState || null

  Object.defineProperty(this, 'isWaiting', { get: () =>  this.gameState == Player.gameStates.WAITING })
}

Player.gameStates = {
  WAITING: 'waiting',
  IN_GAME: 'inGame'
}

function getDefaultColour(id){

  var colour = tinycolor('#' + id.slice(0,6))
  return colour.toHex()
}

module.exports = Player
