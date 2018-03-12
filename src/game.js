function game() {
  if(!(this instanceof game)) return new game()
  this.id = null
  this.players = []
  this.map = null
}

export default game
