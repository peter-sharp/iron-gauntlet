export function destructable(game, state){
  const maxHealth = 1;
  state.health = maxHealth;
  state.defense = state.defence || 0;

  var destroyed = false;

  if(state.defence > 1) state.defence = 1;

  return {

    get isDestroyed() { return destroyed },

    /**
     * damages destructable by the given amount
     * @param  {float} amount amount of dammage
     * @return {[type]}        [description]
     */
    damage(amount) {
      var dammage = amount - (game.rnd.frac() * state.defence);

      state.health -= dammage > 0 ? dammage : 0;

      if(state.health <= 0 ) destroyed = true;
    },

    /**
     * [heal description]
     * @param  {[type]} amount [description]
     * @return {[type]}        [description]
     */
    heal(amount) {
      //TODO
    }
  }
}
