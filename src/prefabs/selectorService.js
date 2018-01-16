export function selectorService(game, tileSize, marker) {

  var selectorStates = {
    Active: {
      opacity: 1,
      color: 0x00ff00

    },

    Off: {
      opacity: 0,
      color: 0x000000
    }
  };


  return function(loc) {

    return marker(game, loc.x, loc.y, tileSize, selectorStates);

  }
}
