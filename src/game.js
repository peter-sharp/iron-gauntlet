function Game() {
  if(!(this instanceof game)) return new game()
  this.id = null
  this,ownerId = null
  this.players = []
  this.map = null
  this.maxPlayers = 2
  this.visibility = 'public'
}

game.addPlayer = function(game, player) {
  game.players.push(player)
  return game
}

module.exports = Game
