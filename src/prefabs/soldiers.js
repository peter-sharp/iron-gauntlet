import Phaser from 'phaser';
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Soldiers extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'soldiers', frame);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default Soldiers;
