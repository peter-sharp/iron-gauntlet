import es6ObjectAssign from 'es6-object-assign';
import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';

es6ObjectAssign.polyfill();

console.assert(Object.assign, 'failed asserting Object has assign method');

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'iron-gauntlet-game');
const tileSize = 16;
const rows = Math.floor(window.innerHeight / tileSize);
const cols = Math.floor(window.innerWidth / tileSize / 0.6);


game.state.add('boot', new Boot());
game.state.add('game', new Game(rows, cols, tileSize));
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());

game.state.start('boot');
