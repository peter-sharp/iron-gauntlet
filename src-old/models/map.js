// not used
export default class Map {

  constructor(rows, cols) {
    this.tiles = [];
    this.rows = rows;
    this.cols = cols;

    for(var y = 0; y < rows; y += 1) {
      let newRow = [];
      for (var x = 0; x < cols; x += 1) {
        newRow.push( (Math.random() > 0.8) ? '#' : '.');
      }
      this[y] = newRow;
    }
  }
}
