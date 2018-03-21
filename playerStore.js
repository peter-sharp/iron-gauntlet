const Socket = require('socket.io/socket')

var players = {};
exports.addSocket = function(player) {
  player.playerInfo = player.playerInfo || {}
  players[player.id] = player
}
