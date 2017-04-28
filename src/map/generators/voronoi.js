import Phaser from 'phaser';

//creates a randomly positioned point object
function _getRandomPoint(game, rows, cols, tileSize) {
  return new Phaser.Point(
    Math.floor(game.world.randomX / tileSize),
    Math.floor(game.world.randomY / tileSize)
  );
}

function _generateRandomPoints(game, rows, cols, tileSize, maxPoints) {
  maxPoints = maxPoints || 14;
  var points = [];

  for(var pointCount = 0; pointCount < maxPoints; pointCount += 1) {
    let point = _getRandomPoint(game, rows, cols, tileSize);
    point.tileType = game.rnd.pick(['grass', 'dirt', 'water']);
    console.log(point);
    points.push(point);
  }
  return points;
}

export function voronoiTilemap(game, rows, cols, name, maxPoints) {

  var points = _generateRandomPoints(game, rows, cols, maxPoints);

  var tileIds = {
    get grass(){ return Math.random() < 0.99? 22 : game.rnd.pick([45,46]) },

    get dirt(){ return Math.random() < 0.99? 85 : game.rnd.pick([108,109]) },

    get water(){ return Math.random() < 0.99? 70 : game.rnd.pick([171,172]) }
  }
  // get ground layer
  var data = [];
  var count = 0;
  for(var y = 0; y < rows; y += 1) {
    let row = [];
    for (var x = 0; x < cols; x += 1) {

      let closest = Infinity;
      let nearestPoint;
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

      var tileId = nearestPoint? tileIds[nearestPoint.tileType] : tileIds.water;
      // if(nearestPoint) {
      //   console.log(nearestPoint.tileType, tileId);
      // }
      row.push(tileId);
    }
    data.push(row.join(','));
  }

  game.cache.addTilemap(name, null, data.join("\n"), Phaser.Tilemap.CSV);
}
