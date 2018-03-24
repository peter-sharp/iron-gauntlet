

var sockets = {};
exports.addSocket = function(socket) {
  socket.playerInfo = socket.playerInfo || {}
  sockets[socket.id] = socket
}

exports.getSocket = function(id) {
  return sockets[id] || false;
}
