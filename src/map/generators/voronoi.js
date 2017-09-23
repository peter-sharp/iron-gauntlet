import Phaser from 'phaser';

import {terrain} from 'prefabs/behaviours/terrain';  //TODO inject

function _voronoiTilemapGenerator (game, map, maxPoints) {
  this.game = game;
  this.rows = map.height;
  this.cols = map.width;
  this.tileIds = map.tileIds;
  this.tileSize = map.tileWidth;
  this.maxPoints = maxPoints || map.height + map.width / 4;
  this.map = map;
  this.generate();
}

_voronoiTilemapGenerator.prototype = {

  terrainTypes: ['grass', 'dirt', 'water'],

  generate: function() {
    var points = _generateRandomPoints.call(this, this.maxPoints);

    this.map.terrain = this.map.create('terrain', this.cols ,this.rows, this.tileSize, this.tileSize);

    this.map.terrain.resizeWorld();


    // get ground layer
    for(var x = 0; x < this.map.width; x += 1){
      for(var y = 0; y < this.map.width; y += 1){
        var closest = Infinity;
        var nearestPoint;
        points.forEach((point) => {
          var coords = {x: x, y: y};

          var distance = point.distance(coords, true);

          if(point.equals(coords)){
            nearestPoint = point;
            closest = 0;
            return;
          }

          if( distance < closest){
            closest = distance;
            nearestPoint = point;
          }
        });

        var terrainType = nearestPoint? nearestPoint.terrainType : 'water';


        var tile = this.map.putTile(this.tileIds[terrainType], x, y, this.map.terrain);
        console.log('tile', tile);

        if(tile) {
          Object.assign(
            tile,
            terrain(terrainType)
          )
        }
      }
    }



  }
}
//creates a randomly positioned point object
// TODO turn into behaviour
function _getRandomPoint( tileSize) {
  return new Phaser.Point(
    Math.floor(this.game.world.randomX / tileSize),
    Math.floor(this.game.world.randomY / tileSize)
  );
}

/**
 * creates randomly located points with a random terrainType
 * @param  {[type]} maxPoints [description]
 * @return {[type]}           [description]
 */
function _generateRandomPoints( maxPoints) {
  maxPoints = maxPoints || 14;
  var points = [];

  for(var pointCount = 0; pointCount < maxPoints; pointCount += 1) {
    let point = _getRandomPoint.call(this, this.tileSize);

    point.terrainType = this.game.rnd.pick(this.terrainTypes);

    console.log(point);
    points.push(point);
  }
  return points;
}

export function voronoiTilemap(game, map, maxPoints) {

  new _voronoiTilemapGenerator(game, map, maxPoints);
}
