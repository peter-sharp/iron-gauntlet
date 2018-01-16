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

//     AssetManifest.images.forEach((image) => {
//       var name = image.split('.').shift();
//       this.game.load.image(name, `assets/images/${image}`);
//     });
    
//     this.game.load.spritesheet('target', 'assets/sprites/target.png',128.66,128);
    
//     AssetManifest.audio.forEach((audio) => {
//       this.game.load.audio(audio.split('.').shift(), `assets/audio/${audio}`);
//     });
    this.game.load.crossOrigin = "Anonymous";
    this.game.load.image('soldiers','https://cdn.glitch.com/db223ed2-fb4f-4f59-81c4-afead9dfe597%2Fsoldiers.png?1506132517778');
    this.game.load.image('tiles_terrain', 'https://cdn.glitch.com/db223ed2-fb4f-4f59-81c4-afead9dfe597%2Foverworld.png?1506132499311');
    this.game.load.image('background', 'https://openclipart.org/image/800px/svg_to_png/202018/cammo.png');
    
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
