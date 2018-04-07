const tinycolor  = require('tinycolor2')
const uuid = require('uuid/v4')


function Player({id, name, colour, role} = {}) {
  if(!(this instanceof Player)) {
    return new Player({
      id,
      name,
      colour,
      role
    })
  }

  this.id = id || uuid(),
  this.name = name || '',
  this.colour = colour || getDefaultColour(this.id),
  this.role = role || 'player'
}

function getDefaultColour(id){

  var colour = tinycolor('#' + id.slice(0,6))
  return colour.toHex()
}

module.exports = Player
