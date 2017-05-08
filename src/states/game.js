import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';
import soldiers from '../prefabs/soldiers';
import Marker from '../prefabs/marker';
import Map from 'models/map';
import {voronoiTilemap} from 'map/generators/voronoi';

class Game extends Phaser.State {

  constructor(rows, cols, tileSize) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.tileSize = tileSize;
  }

  create() {
    //add background image
    // this.background = this.game.add.sprite(0,0,'background');
    // this.background.height = this.game.world.height;
    // this.background.width = this.game.world.width;




    //set up click listeners
    this.game.input.keyboard.addCallbacks(null, null, this.onKeyUp.bind(this));


    //setup audio
    this.gunshot = this.game.add.audio('gunshot');

    // setup random map
    var tileIds = {
      game: this.game,

      get grass(){ return Math.random() < 0.99? 22 : this.game.rnd.pick([45,46]) },

      get dirt(){ return Math.random() < 0.99? 85 : this.game.rnd.pick([108,109]) },

      get water(){ return Math.random() < 0.99? 70 : this.game.rnd.pick([171,172]) }
    }



    this.map = this.game.add.tilemap(
        null,
        this.tileSize,
        this.tileSize,
        this.cols,
        this.rows
      );


    this.map.addTilesetImage('tiles_terrain');


    this.map.tileIds = tileIds;

    voronoiTilemap(this.game, this.map);

    this.marker = new Marker(this.game, 0, 0, this.tileSize);

    this.game.input.addMoveCallback(this.updateMarker, this);

    var player1 = this.game.add.group();

    soldiers(this.game, 32, 64, player1);

  }

  onKeyUp(event) {
    switch(event.keyCode) {
      case keyboard.LEFT:
      case keyboard.RIGHT:
      case keyboard.UP:
      case keyboard.DOWN:
    }
  }


  update() {
  //   this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
  // this.display.render();
  }

  updateMarker() {
    var pointer = this.game.input.activePointer;

    var tile = this.map.getTile(
                          this.map.terrain.getTileX(pointer.worldX),
                          this.map.terrain.getTileX(pointer.worldY),
                          'terrain'
                        );
    console.log(tile);


    this.marker.x = this.map.terrain.getTileX(pointer.worldX) * this.tileSize;
    this.marker.y = this.map.terrain.getTileX(pointer.worldY) * this.tileSize;

    //TODO optimise
    if(tile && 'water' == tile.properties.tileType) {
      this.marker.renderNoGo();
      return;
    }

    this.marker.renderGo();
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
