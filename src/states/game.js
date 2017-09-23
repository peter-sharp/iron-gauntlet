import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';
import {locationRule} from '../prefabs/locationRule';
import {locationFinder} from '../prefabs/behaviours/locationFinder';
import {randomTileGetter} from '../prefabs/behaviours/randomTileGetter';
import {selectorService} from '../prefabs/selectorService';
import soldiers from '../prefabs/soldiers';
import marker from '../prefabs/marker';
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

    var locationRules = {
      land: locationRule('land', {impassable:['water']}),
      sea: locationRule('sea', {passable:['water']})
    }


    this.map = this.game.add.tilemap(
        null,
        this.tileSize,
        this.tileSize,
        this.cols,
        this.rows
      );
    Object.assign(
      this.map,
      locationFinder(Phaser, this.game, this.map),
      randomTileGetter(this.game, this.map)
    );

    this.map.addTilesetImage('tiles_terrain');


    this.map.tileIds = tileIds;

    voronoiTilemap(this.game, this.map);

    var cursorStates = {
      NoGo: {
        opacity: 1,
        color: 0xff0000

      },

      Go: {
        opacity: 0.2,
        color: 0x000000
      }
    }

    this.cursor = marker(this.game, 0, 0, this.tileSize, cursorStates);




    this.game.input.addMoveCallback(this.updateCursor, this);

    var player1 = this.game.add.group();


    var soldierLoc = this.map.findRandomLocation(locationRules.land);

    soldiers( this.map, soldierLoc.x, soldierLoc.y, player1);


  }

  onKeyUp(event) {
    // switch(event.keyCode) {
    //   case keyboard.LEFT:
    //   case keyboard.RIGHT:
    //   case keyboard.UP:
    //   case keyboard.DOWN:
    // }
  }


  update() {
  //   this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
  // this.display.render();
  }

  updateCursor() {
    var pointer = this.game.input.activePointer;

    var tile = this.map.getTile(
                          this.map.terrain.getTileX(pointer.worldX),
                          this.map.terrain.getTileX(pointer.worldY),
                          'terrain'
                        );
    console.log(tile);


    this.cursor.updatePosition({
      x: this.map.terrain.getTileX(pointer.worldX) * this.tileSize,
      y: this.map.terrain.getTileX(pointer.worldY) * this.tileSize
    });

    //TODO optimise
    if(tile && 'water' == tile.terrainType) {
      this.cursor.render('NoGo');
      return;
    }

    this.cursor.render('Go');
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
