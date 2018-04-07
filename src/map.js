const uniqueId = require('lodash/fp/uniqueId')

function Map({id = null, cols = 20, rows = 20, tsize = 48, tiles = []} = {}) {
  if(!(this instanceof Map)) return new Map({id, cols, rows, tsize, tiles})
  this.id = id || uniqueId('map_')
  this.cols = cols
  this.rows = rows
  this.tsize = tsize
  this.tiles = tiles
  if(!tiles.length) this.tiles =  Map.getBlankTiles(this.cols, this.rows)
}

Map.resetTiles = (map) => {
  map = Map(map)
  map.tiles = Map.getBlankTiles(map.cols, map.rows)
  return map
}

Map.getBlankTiles = (cols, rows) => {
  var tiles = []
  for(var i = 0; i < rows *cols; i += 1) tiles.push(null)

  return tiles
}

Map.map = (fn, map) => {
  map = Map(map)
  var tiles = []
  for(var r = 0; r < map.cols; r += 1) {
    for(var c = 0; c < map.cols; c += 1) {
      tiles.push(fn(Map.getTile(r, c, map), [r, c], map))
    }
  }
  map.tiles = tiles
  return map
}

Map.each = (fn, map) => {
  for(var r = 0; r < map.cols; r += 1) {
    for(var c = 0; c < map.cols; c += 1) {
      fn(Map.getTile(r, c, map), [r, c], map)
    }
  }
}

Map.getTile = (row, col, map) => map.tiles[row * map.cols + col]

Map.getRndTileVect = (map) => [Math.floor(map.cols * Math.random()), Math.floor(map.rows * Math.random())]

Map.distanceTo = ([r1, c1], [r2, c2]) => {
  return Math.hypot(r1 - r2, c1 - c2);
}

Map.vecsEqual = ([r1, c1], [r2, c2]) => {
  return r1 === r2 && c1 === c2;
}

module.exports = Map
