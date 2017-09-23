/**
 * creats a location rule object
 * @param  {[type]} typeName    [description]
 * @param  {[type]} permissions [description]
 * @return {Object}             [description]
 */
export function locationRule(typeName, permissions){
  permissions = permissions || {};
  var state = {};
  state.passable = permissions.passable;
  state.impassable = permissions.impassable;


  return {

    /**
     * checks if the given location rule can be put on the given tile
     * @param  {[type]} type [description]
     * @param  {[type]} tile [description]
     * @return {[type]}      [description]
     */
    isPassable(tile){

      if(state.impassable && state.impassable.indexOf(tile.terrainType) > -1) {
        return false;
      }

      if(state.passable && state.passable.indexOf(tile.terrainType) > -1){
        return true;
      }

      // all others are false
      if(state.passable) return false;

      // all others are true
      if(state.impassable) return true;

      // can be put on all terrain
      return true;
    }
  }
}
