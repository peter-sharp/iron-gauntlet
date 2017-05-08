import Phaser from 'phaser';
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
function soldiers(game, x, y, player){
  var state = {};
  state.player = player;
  state.sprite = player.create(x, y, 'soldiers');
  return {

  }
}

export default soldiers;
