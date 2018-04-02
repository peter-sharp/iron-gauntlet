const isObject = require('lodash/fp/isObject')
const Player = require('./src/player')
const faker = require('faker')

var players = {};
exports.updatePlayer = function(socketId, player = null) {
  if(isObject(socketId)) socketId = socketId.id
  player = player ? Player(player) : Player()
  player.name = player.name || faker.internet.userName()

  players[socketId] = player
}

exports.getPlayer = function(socketId) {
  if(isObject(socketId)) socketId = socketId.id;
  return players[socketId] || false;
}
