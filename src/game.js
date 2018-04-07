const isObject = require('lodash/fp/isObject')

function Game({
                id,
                title,
                ownerId,
                players,
                map,
                mapOptions,
                maxPlayers,
                visibility
              } = {}) {
  if(!(this instanceof Game)) {
    return new Game({
      id,
      title,
      ownerId,
      players,
      map,
      mapOptions,
      maxPlayers,
      visibility
    })
  }
  this.id = id || null
  this.title = title || ''
  this.ownerId = ownerId || null
  this.players = players || []
  this.map = map || null
  this.mapOptions = mapOptions || []
  this.maxPlayers = maxPlayers || 2
  this.visibility = visibility || 'public'
}

Game.addPlayer = function(game, player) {
  game.players.push(player)
  return game
}

Game.removePlayer = function(game, playerId) {
  if(isObject(playerId)) playerId = playerId.id
  let idx = game.players.findIndex(player => player.id === playerId)
  game.players.splice(idx, 1)
  return game
}

Game.isOwner = function(game, player) {
  return game.ownerId == player.id
}

module.exports = Game
