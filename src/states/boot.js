
class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.load.crossOrigin = "Anonymous";
    this.load.image('preloader', 'https://cdn.glitch.com/db223ed2-fb4f-4f59-81c4-afead9dfe597%2Fpreloader.gif?1506144283499');
  }

  create() {

    this.game.input.maxPointers = 1;
    this.game.scale.pageAlignHorizontally = true;
    //setup device scaling
    if (!this.game.device.desktop) {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.minWidth =  480;
      this.game.scale.minHeight = 260;
      this.game.scale.maxWidth = 640;
      this.game.scale.maxHeight = 480;
      this.game.scale.forceOrientation(true);
      this.game.scale.setScreenSize(true);
    }

    this.initGlobalVariables();

    this.game.state.start('preloader');
  }

  initGlobalVariables(){
    this.game.global = {
      score: 0
    };
  }

}

export default Boot;
