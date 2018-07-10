const isObject = require('lodash/fp/isObject')
const Player = require('./src/player')
const faker = require('faker')

const players = {}
const playersBySocketId = {}
exports.updatePlayer = function(socketId, player = null) {
  if(isObject(socketId)) socketId = socketId.id
  player = player ? Player(player) : Player()
  player.name = player.name || faker.internet.userName()

  players[player.id] = player
  playersBySocketId[socketId] = player.id
}

exports.getPlayerBySocketId = function(socketId) {
  if(isObject(socketId)) socketId = socketId.id
  let playerId = playersBySocketId[socketId]

  return players[playerId] || false
}

exports.getPlayerById = function(id) {
  if(isObject(id)) id = id.id
  return players[id] || false
}

exports.removePlayerById = function(id) {
  if(isObject(id)) id = id.id
  delete players[id]
}

exports.removePlayerBySocketId = function(socketId) {
  if(isObject(socketId)) socketId = socketId.id
  let playerId = playersBySocketId[socketId]
  delete playersBySocketId[socketId]
  delete players[playerId]
}
