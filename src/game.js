function game() {
  if(!(this instanceof game)) return new game()
  this.id = null
  this.players = []
  this.map = null
  this.maxPlayers = 2
  this.visibility = 'public'
}

export default game
