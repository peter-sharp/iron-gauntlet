import Phaser from 'phaser';

function _voronoiTilemapGenerator (game, map, progressCb, maxPoints) {
  this.game = game;
  this.rows = map.height;
  this.cols = map.width;
  this.tileIds = map.tileIds;
  this.tileSize = map.tileWidth;
  this.maxPoints = maxPoints || map.height + map.width / 4;
  this.progressCb = progressCb;
  this.map = map;
  this.generate();
}

_voronoiTilemapGenerator.prototype = {

  tileTypes: ['grass', 'dirt', 'water'],

  generate: function() {
    var points = _generateRandomPoints.call(this, this.maxPoints);

    this.map.terrain = this.map.create('terrain', this.cols ,this.rows, this.tileSize, this.tileSize);

    this.map.terrain.resizeWorld();
    
    // for progress cb
    var tileProgress = 0;
    const tilesTotal = this.cols * this.rows;
    
    // get ground layer
    for(var x = 0; x < this.map.width; x += 1){
      for(var y = 0; y < this.map.width; y += 1){
        
        const nearestPoint = findNearestPoint(points, {x: x, y: y});
        var tileType = nearestPoint? nearestPoint.tileType : 'water';


        var tile = this.map.putTile(this.tileIds[tileType], x, y, this.map.terrain);
        console.log('tile', tile);
        
        if(tile) {
          tile.properties.tileType = tileType;
        }
        tileProgress +=1;
        this.progressCb(tileProgress, tilesTotal, tileProgress/tilesTotal);
      }
    }



  }
}
//creates a randomly positioned point object
function _getRandomPoint( tileSize) {
  return new Phaser.Point(
    Math.floor(this.game.world.randomX / tileSize),
    Math.floor(this.game.world.randomY / tileSize)
  );
}

/**
 * creates randomly located points with a random tileType
 * @param  {[type]} maxPoints [description]
 * @return {[type]}           [description]
 */
function _generateRandomPoints( maxPoints) {
  maxPoints = maxPoints || 14;
  var points = [];

  for(var pointCount = 0; pointCount < maxPoints; pointCount += 1) {
    let point = _getRandomPoint.call(this, this.tileSize);

    point.tileType = this.game.rnd.pick(this.tileTypes);

    console.log(point);
    points.push(point);
  }
  return points;
}



export function voronoiTilemap(game, map, progressCb, maxPoints) {

  return new _voronoiTilemapGenerator(game, map, progressCb, maxPoints);
}


function findNearestPoint(points, coords){
  var closest = Infinity;
  var nearestPoint;
  for (let point of points){

    var distance = point.distance(coords, true);

    if(point.equals(coords)){
      nearestPoint = point;
      closest = 0;
      return nearestPoint;
    }

    if( distance < closest){
      closest = distance;
      nearestPoint = point;
    }
  }
  
  return nearestPoint;
}