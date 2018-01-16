export function randomTileGetter(game, map) {
  return {
    getRandomTile(layer) {
      const x = Math.floor((game.world.randomX - map.tileWidth) / map.tileWidth);
      const y = Math.floor((game.world.randomY - map.tileHeight) / map.tileHeight);
      return map.getTile(x, y, layer);
    }
  }
}
