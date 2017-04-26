import Phaser from 'phaser';
export function randomTilemap(game, rows, cols, name) {

  // get ground layer
  var data = [];
  var count = 0;
  for(var y = 0; y < rows; y += 1) {
    let row = [];
    for (var x = 0; x < cols; x += 1) {
      row.push((Math.random() > 0.8) ? 85 : 22); 
      // randomly set tile to either grass or trees

    }
    data.push(row.join(','));
  }

  game.cache.addTilemap(name, null, data.join("\n"), Phaser.Tilemap.CSV);
}
