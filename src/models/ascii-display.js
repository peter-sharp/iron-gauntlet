function _initCell(chr, x, y) {
  var offset = 0.6;


  var style = { font: this.tileSize + 'px monospace', fill: '#333'};
  return this.game.add.text(this.tileSize*offset*x, this.tileSize*y, chr, style);
}

export default class AsciiDisplay {

  constructor(game, map, tileSize){
    this.game = game;
    this.map = map;
    this.tileSize = tileSize;
    this.display = [];

    for( var y = 0; y < this.map.rows; y += 1) {
      var newRow = [];
      for( var x = 0; x < this.map.cols; x += 1) {
        newRow.push(_initCell.call(this,'', x, y));

      }
      this.display.push(newRow);
    }
  }

  render(){
    for( var y = 0; y < this.map.rows; y += 1) {
      for( var x = 0; x < this.map.cols; x += 1) {
        this.display[y][x]
            .setText(this.map[y][x])
            .setStyle({fill:('#' == this.map[y][x]) ? '#77d' : '#551'});
        // console.log(this.map[y][x]);

      }
    }
  }
}
