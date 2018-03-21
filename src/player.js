const tinycolor  = require('tinycolor2')
const uuid = require('uuid/v4')


function makePlayer({id, name, colour}) {
  id = id || uuid()
  return {
    id,
    name: name || `player ${id}`,
    colour: colour || getDefaultColour(id)
  }
}

function getDefaultColour(id){

  var colour = tinycolor('#' + id.slice(0,6))
  return colour.toHex()
}

module.exports = makePlayer
