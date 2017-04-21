import AssetManifest from 'AssetManifest';

class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {

    // AssetManifest.images.forEach((image) => {
    //   var name = image.split('.').shift();
    //   this.game.load.image(name, `assets/images/${image}`);
    // });
    //
    // this.game.load.spritesheet('target', 'assets/sprites/target.png',128.66,128);
    //
    // AssetManifest.audio.forEach((audio) => {
    //   this.game.load.audio(audio.split('.').shift(), `assets/audio/${audio}`);
    // });
    this.game.load.image('background','assets/images/background.png');
    this.game.load.image('crosshairs', 'assets/images/crosshairs.png');
    this.game.load.image('text_go', 'assets/images/text_go.png');
    this.game.load.image('text_ready', 'assets/images/text_ready.png');

    this.game.load.spritesheet('target', 'assets/sprites/target.png',128.66,128);

    this.game.load.audio('gunshot','assets/audio/gunshot.wav');
    this.game.load.audio('ding','assets/audio/ding.wav');
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
