//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Graphics.html
class Marker {

  //initialization code in the constructor
  constructor(game, x, y, tileSize, color) {

    this.graphic = game.add.graphics();
    this.tileSize = tileSize;
    this.color = color || 0x000000;
    this.opacity = 0.2;
    this.render();
  }

  render() {
    this.graphic.clear();
    this.graphic.lineStyle(2, this.color, this.opacity);
    this.graphic.drawRect(0, 0, this.tileSize, this.tileSize);
  }

  set x(value) { this.graphic.x = value}

  set y(value) { this.graphic.y = value}

  renderNoGo() {
    this.opacity = 1;
    this.color = 0xff0000;
    this.render();
  }

  renderGo() {
    this.opacity = 0.2;
    this.color = 0x000000;
    this.render();
  }

}

export default Marker;
