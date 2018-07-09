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

Game.addPlayer = function(game, playerId) {
  if(Game.hasPlayer(game, playerId)) return game
  if(isObject(playerId)) playerId = playerId.id
  game.players.push(playerId)
  return game
}

Game.removePlayer = function(game, playerId) {
  if(isObject(playerId)) playerId = playerId.id
  let idx = game.players.findIndex(player => player === playerId)
  game.players.splice(idx, 1)
  return game
}

// TODO this function is now useless
Game.getPlayer = function(game, playerId) {
  if(isObject(playerId)) playerId = playerId.id
  return game.players.find(player => player === playerId)
}

Game.hasPlayer = function(game, playerId) {
  if(isObject(playerId)) playerId = playerId.id
  return game.players.indexOf(playerId) > -1
}

Game.isOwner = function(game, playerId) {
  if(isObject(playerId)) playerId = playerId.id
  return game.ownerId == playerId
}

module.exports = Game
