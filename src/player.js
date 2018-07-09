const tinycolor  = require('tinycolor2')
const uuid = require('uuid/v4')


function Player({id, name, colour, role, gameId} = {}) {
  if(!(this instanceof Player)) {
    return new Player({
      id,
      name,
      colour,
      role,
      gameId
    })
  }

  this.id = id || uuid(),
  this.name = name || '',
  this.colour = colour || getDefaultColour(this.id),
  this.role = role || 'player'
  this.gameId = gameId || null
}

function getDefaultColour(id){

  var colour = tinycolor('#' + id.slice(0,6))
  return colour.toHex()
}

module.exports = Player
