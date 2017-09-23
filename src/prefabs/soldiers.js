import Phaser from 'phaser';
import {selectable} from '../prefabs/selectable'
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
function soldiers(game, x, y, player){
  var state = {};
  state.player = player;
  state.sprite = player.create(x, y, 'soldiers');
  state.events = {
    onInputDown: {
      add() {}
    }
  };
  return Object.assign(
    {},
    selectable(state)
  );
}

export default soldiers;
