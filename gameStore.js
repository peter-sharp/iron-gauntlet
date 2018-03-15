var games = {};
exports.addGame = function(game) {
  games[game.id] = game
}

exports.getGame = function(id) {
  if(!id) return Object.values(games);
  return games[id];
}
