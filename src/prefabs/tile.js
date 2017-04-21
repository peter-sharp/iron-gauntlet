
//Documentation for Phaser's (2.6.2) tile sprites:: phaser.io/docs/2.6.2/Phaser.TileSprite.html
class Tile extends Phaser.TileSprite {

  //initialization code in the constructor
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, 'tile');
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Tile;
