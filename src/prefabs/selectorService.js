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

  return function(x, y) {

    return marker(game, x, y, tileSize, selectorStates);
  }
}
