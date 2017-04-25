import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';
import Map from 'models/map';
import AsciiDisplay from 'models/ascii-display';
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


    //setup UI
    // this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
    //   font: '40px Arial', fill: '#ffffff', align: 'center'
    // });
    // this.countdownText.anchor.set(0.5,0);

    //set up click listeners
    this.game.input.keyboard.addCallbacks(null, null, this.onKeyUp.bind(this));


    //setup audio
    this.gunshot = this.game.add.audio('gunshot');

    this.map = new Map(this.rows, this.cols);

    this.asciiDisplay = new AsciiDisplay(this, this.map, this.tileSize);

    //setup prefabs
    // this.crosshairs = new Crosshairs(this.game);
    // this.target = new Target(this.game,this.game.world.centerX,this.game.world.centerY);
    // this.game.add.existing(this.crosshairs);
    // this.game.add.existing(this.target);

    //setup a timer to end the game
    // this.endGameTimer = this.game.time.create();
    // this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame,this);
    // this.endGameTimer.start();
    this.asciiDisplay.render();
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

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
