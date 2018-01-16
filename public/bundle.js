/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = Phaser;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marker = marker;
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Graphics.html
function marker(game, x, y, tileSize, displayStates) {
  displayStates = displayStates || {};

  var displayStateDefault = displayStates.default || {
    color: 0x000000,
    opacity: 0.2
  };
  var state = {};
  debugger;
  state.graphic = game.add.graphics();
  state.tileSize = tileSize;
  state.color = displayStateDefault.color;
  state.opacity = displayStateDefault.opacity;
  state.displayStates = displayStates;

  /**
   * updates the marker's color and opacity state from
   * the displayState with the given name
   * @param  {string} state [description]
   */
  function updateStateFromDisplayState(stateName) {
    var selectedState = displayStates[stateName];
    state.color = selectedState.color;
    state.opacity = selectedState.opacity;
  }

  return {
    /**
     * renders the marker's color and opacity state from
     * the displayState with the given name
     * @param  {string} state [description]
     */
    render: function render(displayState) {
      updateStateFromDisplayState(displayState);
      state.graphic.clear();
      state.graphic.lineStyle(2, state.color, state.opacity);
      state.graphic.drawRect(0, 0, state.tileSize, state.tileSize);
    },

    updatePosition: function updatePosition(pos) {

      state.graphic.x = pos.x;
      state.graphic.y = pos.y;
    }
  };
}

exports.default = marker;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = function (_Phaser$State) {
  _inherits(Boot, _Phaser$State);

  function Boot() {
    _classCallCheck(this, Boot);

    return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).call(this));
  }

  _createClass(Boot, [{
    key: 'preload',
    value: function preload() {
      this.load.crossOrigin = "Anonymous";
      this.load.image('preloader', 'https://cdn.glitch.com/db223ed2-fb4f-4f59-81c4-afead9dfe597%2Fpreloader.gif?1506144283499');
    }
  }, {
    key: 'create',
    value: function create() {

      this.game.input.maxPointers = 1;
      this.game.scale.pageAlignHorizontally = true;
      //setup device scaling
      if (!this.game.device.desktop) {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minWidth = 480;
        this.game.scale.minHeight = 260;
        this.game.scale.maxWidth = 640;
        this.game.scale.maxHeight = 480;
        this.game.scale.forceOrientation(true);
        this.game.scale.setScreenSize(true);
      }

      this.initGlobalVariables();

      this.game.state.start('preloader');
    }
  }, {
    key: 'initGlobalVariables',
    value: function initGlobalVariables() {
      this.game.global = {
        score: 0
      };
    }
  }]);

  return Boot;
}(Phaser.State);

exports.default = Boot;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(0);

var _phaser2 = _interopRequireDefault(_phaser);

var _crosshairs = __webpack_require__(14);

var _crosshairs2 = _interopRequireDefault(_crosshairs);

var _target = __webpack_require__(19);

var _target2 = _interopRequireDefault(_target);

var _locationRule = __webpack_require__(15);

var _locationFinder = __webpack_require__(12);

var _randomTileGetter = __webpack_require__(13);

var _selectorService = __webpack_require__(17);

var _soldiers = __webpack_require__(18);

var _soldiers2 = _interopRequireDefault(_soldiers);

var _marker = __webpack_require__(1);

var _marker2 = _interopRequireDefault(_marker);

var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _voronoi = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  function Game(rows, cols, tileSize) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this.rows = rows;
    _this.cols = cols;
    _this.tileSize = tileSize;
    return _this;
  }

  _createClass(Game, [{
    key: 'create',
    value: function create() {
      //add background image
      // this.background = this.game.add.sprite(0,0,'background');
      // this.background.height = this.game.world.height;
      // this.background.width = this.game.world.width;


      //set up click listeners
      // this.game.input.keyboard.addCallbacks(null, null, this.onKeyUp.bind(this));

      var Selector = (0, _selectorService.selectorService)(this.game, this.tileSize, _marker2.default);
      //setup audio
      this.gunshot = this.game.add.audio('gunshot');

      // setup random map
      var tileIds = {
        game: this.game,

        get grass() {
          return Math.random() < 0.99 ? 22 : this.game.rnd.pick([45, 46]);
        },

        get dirt() {
          return Math.random() < 0.99 ? 85 : this.game.rnd.pick([108, 109]);
        },

        get water() {
          return Math.random() < 0.99 ? 70 : this.game.rnd.pick([171, 172]);
        }
      };

      var locationRules = {
        land: (0, _locationRule.locationRule)('land', { impassable: ['water'] }),
        sea: (0, _locationRule.locationRule)('sea', { passable: ['water'] })
      };

      this.map = this.game.add.tilemap(null, this.tileSize, this.tileSize, this.cols, this.rows);

      Object.assign(this.map, (0, _locationFinder.locationFinder)(_phaser2.default, this.game, this.map), (0, _randomTileGetter.randomTileGetter)(this.game, this.map));

      this.map.addTilesetImage('tiles_terrain');

      this.map.tileIds = tileIds;

      //	Progress report
      var progressText = this.game.add.text(this.game.world.height / 2, this.game.world.width / 2, '', { fill: '#ffffff' });

      (0, _voronoi.voronoiTilemap)(this.game, this.map, this.showProgress.bind(this, progressText));

      var cursorStates = {
        NoGo: {
          opacity: 1,
          color: 0xff0000

        },

        Go: {
          opacity: 0.2,
          color: 0x000000
        }
      };

      this.cursor = (0, _marker2.default)(this.game, 0, 0, this.tileSize, cursorStates);

      this.game.input.addMoveCallback(this.updateCursor, this);

      var player1 = this.game.add.group();

      var soldierLoc = this.map.findRandomLocation(locationRules.land);

      (0, _soldiers2.default)(this.map, soldierLoc, player1, Selector(soldierLoc));
    }

    // onKeyUp(event) {
    //   switch(event.keyCode) {
    //     case keyboard.LEFT:
    //     case keyboard.RIGHT:
    //     case keyboard.UP:
    //     case keyboard.DOWN:
    //   }
    // }


  }, {
    key: 'update',
    value: function update() {
      //   this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
      // this.display.render();
    }
  }, {
    key: 'showProgress',
    value: function showProgress(text, count, total, progress) {
      text.setText('generating map ' + 100 * progress + '%');
    }
  }, {
    key: 'updateCursor',
    value: function updateCursor() {
      var pointer = this.game.input.activePointer;

      var tile = this.map.getTile(this.map.terrain.getTileX(pointer.worldX), this.map.terrain.getTileX(pointer.worldY), 'terrain');
      console.log(tile);

      this.cursor.updatePosition({
        x: this.map.terrain.getTileX(pointer.worldX) * this.tileSize,
        y: this.map.terrain.getTileX(pointer.worldY) * this.tileSize
      });

      //TODO optimise
      if (tile && 'water' == tile.properties.tileType) {
        this.cursor.render('NoGo');
        return;
      }

      this.cursor.render('Go');
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      this.game.state.start('gameover');
    }
  }]);

  return Game;
}(_phaser2.default.State);

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$State) {
  _inherits(Menu, _Phaser$State);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
  }

  _createClass(Menu, [{
    key: 'create',
    value: function create() {
      //add background image
      this.background = this.game.add.sprite(0, 0, 'background');
      this.background.height = this.game.world.height;
      this.background.width = this.game.world.width;

      //add intro text
      this.gameoverText = this.add.text(this.game.world.centerX, this.game.world.centerY, "Score = " + this.game.global.score, {
        font: '42px Arial', fill: '#ffffff', align: 'center'
      });
      this.gameoverText.anchor.set(0.5);

      this.input.onDown.add(this.onInputDown, this);

      //prevent accidental click-thru by not allowing state transition for a short time
      this.canContinueToNextState = false;
      this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
        this.canContinueToNextState = true;
      }, this);

      this.saveVarsToLocalStorage();
      this.resetGlobalVariables();
    }
  }, {
    key: 'saveVarsToLocalStorage',
    value: function saveVarsToLocalStorage() {
      var max = localStorage.maxScore || 0; //default value of 0 is it does not exist
      if (this.game.global.score > max) {
        localStorage.maxScore = this.game.global.score;
      }
    }
  }, {
    key: 'resetGlobalVariables',
    value: function resetGlobalVariables() {
      this.game.global.score = 0;
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'onInputDown',
    value: function onInputDown() {
      if (this.canContinueToNextState) {
        this.game.state.start('menu');
      }
    }
  }]);

  return Menu;
}(Phaser.State);

exports.default = Menu;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$State) {
  _inherits(Menu, _Phaser$State);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
  }

  _createClass(Menu, [{
    key: 'create',
    value: function create() {
      //add background image
      this.background = this.game.add.sprite(0, 0, 'background');
      this.background.height = this.game.world.height;
      this.background.width = this.game.world.width;

      //add some fancy transition effects
      // this.ready = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_ready');
      // this.ready.anchor.set(0.5,0.5);
      // this.ready.visible=false;
      // this.go = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'text_go');
      // this.go.anchor.set(0.5,0.5);
      // this.go.visible=false;

      //add intro text
      this.menuText = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Click to play', {
        font: '42px Arial', fill: '#ffffff', align: 'center'
      });
      this.menuText.anchor.set(0.5);

      this.input.onDown.add(this.onInputDown, this);
      this.canContinueToNextState = true;
    }
  }, {
    key: 'update',
    value: function update() {}

    //create some cool tweens and apply them to 'this.ready' and 'this.go'

  }, {
    key: 'onInputDown',
    value: function onInputDown() {
      if (!this.canContinueToNextState) {
        //do not allow tweens to be created multiple times simultaneously
        return;
      }

      this.canContinueToNextState = false;
      // this.ready.visible = true;
      this.menuText.visible = false;
      // this.go.angle = -15;

      //create some tweens - http://phaser.io/docs/2.6.2/Phaser.Tween.html#to
      //     const ready_tween = this.game.add.tween(this.ready.scale)
      //       .to({ x: 1.5, y: 1.5}, 500, Phaser.Easing.Linear.In,false,0,-1,true);

      //     const go_tween = this.game.add.tween(this.go)
      //       .to({ angle: 15}, 200, Phaser.Easing.Linear.In,false,0,-1,true);

      //when the 'ready' tween is done, hide it and show 'go'. perform a shaking/rotating tween on 'go'. When 'go' is done, start the game
      //     var go_tween_repeat_num = 3; //how many times these tweens should loop
      //     var ready_tween_repeat_num = 3;

      //     const go_tween_loop = function(){
      //       go_tween_repeat_num -= 0.5;
      //       if(go_tween_repeat_num < 1){
      //         this.go.visible = false;
      //         this.game.state.start('game');
      //       }
      //     };
      //     const ready_tween_loop = function(){
      //       ready_tween_repeat_num -= 0.5;
      //       if(ready_tween_repeat_num < 1){
      //         this.ready.visible = false;
      //         this.go.visible = true;

      //         go_tween.start();
      //       }
      //     };
      //     ready_tween.onLoop.add(ready_tween_loop, this);
      //     go_tween.onLoop.add(go_tween_loop, this);


      //     ready_tween.start();
      this.game.state.start('game');
    }
  }]);

  return Menu;
}(Phaser.State);

exports.default = Menu;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AssetManifest = __webpack_require__(8);

var _AssetManifest2 = _interopRequireDefault(_AssetManifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preloader = function (_Phaser$State) {
  _inherits(Preloader, _Phaser$State);

  function Preloader() {
    _classCallCheck(this, Preloader);

    var _this = _possibleConstructorReturn(this, (Preloader.__proto__ || Object.getPrototypeOf(Preloader)).call(this));

    _this.asset = null;
    _this.ready = false;
    return _this;
  }

  _createClass(Preloader, [{
    key: 'preload',
    value: function preload() {
      //setup loading bar
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      //Setup loading and its events
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();
    }
  }, {
    key: 'loadResources',
    value: function loadResources() {

      //     AssetManifest.images.forEach((image) => {
      //       var name = image.split('.').shift();
      //       this.game.load.image(name, `assets/images/${image}`);
      //     });

      //     this.game.load.spritesheet('target', 'assets/sprites/target.png',128.66,128);

      //     AssetManifest.audio.forEach((audio) => {
      //       this.game.load.audio(audio.split('.').shift(), `assets/audio/${audio}`);
      //     });
      this.game.load.crossOrigin = "Anonymous";
      this.game.load.image('soldiers', 'https://cdn.glitch.com/db223ed2-fb4f-4f59-81c4-afead9dfe597%2Fsoldiers.png?1506132517778');
      this.game.load.image('tiles_terrain', 'https://cdn.glitch.com/db223ed2-fb4f-4f59-81c4-afead9dfe597%2Foverworld.png?1506132499311');
      this.game.load.image('background', 'https://openclipart.org/image/800px/svg_to_png/202018/cammo.png');
    }
  }, {
    key: 'onLoadComplete',
    value: function onLoadComplete() {
      this.game.state.start('menu');
    }
  }]);

  return Preloader;
}(Phaser.State);

exports.default = Preloader;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var AssetManifest = {
  sprites: ['target.png'],
  bitmapFonts: [],
  images: ['background.png', 'crosshairs.png', 'preloader.gif', 'text_go.png', 'text_ready.png'],
  audio: ['ding.wav', 'gunshot.wav']
};

exports.default = AssetManifest;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _es6ObjectAssign = __webpack_require__(7);

var _es6ObjectAssign2 = _interopRequireDefault(_es6ObjectAssign);

var _boot = __webpack_require__(2);

var _boot2 = _interopRequireDefault(_boot);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _menu = __webpack_require__(5);

var _menu2 = _interopRequireDefault(_menu);

var _preloader = __webpack_require__(6);

var _preloader2 = _interopRequireDefault(_preloader);

var _gameover = __webpack_require__(4);

var _gameover2 = _interopRequireDefault(_gameover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6ObjectAssign2.default.polyfill();

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'iron-gauntlet-game');
var tileSize = 16;
var rows = Math.floor(window.innerHeight / tileSize);
var cols = Math.floor(window.innerWidth / tileSize / 0.6);

game.state.add('boot', new _boot2.default());
game.state.add('game', new _game2.default(rows, cols, tileSize));
game.state.add('menu', new _menu2.default());
game.state.add('preloader', new _preloader2.default());
game.state.add('gameover', new _gameover2.default());

game.state.start('boot');

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voronoiTilemap = voronoiTilemap;

var _phaser = __webpack_require__(0);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _voronoiTilemapGenerator(game, map, progressCb, maxPoints) {
  this.game = game;
  this.rows = map.height;
  this.cols = map.width;
  this.tileIds = map.tileIds;
  this.tileSize = map.tileWidth;
  this.maxPoints = maxPoints || map.height + map.width / 4;
  this.progressCb = progressCb;
  this.map = map;
  this.generate();
}

_voronoiTilemapGenerator.prototype = {

  tileTypes: ['grass', 'dirt', 'water'],

  generate: function generate() {
    var points = _generateRandomPoints.call(this, this.maxPoints);

    this.map.terrain = this.map.create('terrain', this.cols, this.rows, this.tileSize, this.tileSize);

    this.map.terrain.resizeWorld();

    // for progress cb
    var tileProgress = 0;
    var tilesTotal = this.cols * this.rows;

    // get ground layer
    for (var x = 0; x < this.map.width; x += 1) {
      for (var y = 0; y < this.map.width; y += 1) {

        var nearestPoint = findNearestPoint(points, { x: x, y: y });
        var tileType = nearestPoint ? nearestPoint.tileType : 'water';

        var tile = this.map.putTile(this.tileIds[tileType], x, y, this.map.terrain);
        console.log('tile', tile);

        if (tile) {
          tile.properties.tileType = tileType;
        }
        tileProgress += 1;
        this.progressCb(tileProgress, tilesTotal, tileProgress / tilesTotal);
      }
    }
  }
  //creates a randomly positioned point object
};function _getRandomPoint(tileSize) {
  return new _phaser2.default.Point(Math.floor(this.game.world.randomX / tileSize), Math.floor(this.game.world.randomY / tileSize));
}

/**
 * creates randomly located points with a random tileType
 * @param  {[type]} maxPoints [description]
 * @return {[type]}           [description]
 */
function _generateRandomPoints(maxPoints) {
  maxPoints = maxPoints || 14;
  var points = [];

  for (var pointCount = 0; pointCount < maxPoints; pointCount += 1) {
    var point = _getRandomPoint.call(this, this.tileSize);

    point.tileType = this.game.rnd.pick(this.tileTypes);

    console.log(point);
    points.push(point);
  }
  return points;
}

function voronoiTilemap(game, map, progressCb, maxPoints) {

  return new _voronoiTilemapGenerator(game, map, progressCb, maxPoints);
}

function findNearestPoint(points, coords) {
  var closest = Infinity;
  var nearestPoint;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var point = _step.value;


      var distance = point.distance(coords, true);

      if (point.equals(coords)) {
        nearestPoint = point;
        closest = 0;
        return nearestPoint;
      }

      if (distance < closest) {
        closest = distance;
        nearestPoint = point;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return nearestPoint;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// not used
var Map = function Map(rows, cols) {
  _classCallCheck(this, Map);

  this.tiles = [];
  this.rows = rows;
  this.cols = cols;

  for (var y = 0; y < rows; y += 1) {
    var newRow = [];
    for (var x = 0; x < cols; x += 1) {
      newRow.push(Math.random() > 0.8 ? '#' : '.');
    }
    this[y] = newRow;
  }
};

exports.default = Map;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationFinder = locationFinder;
function locationFinder(Phaser, game, map) {

  function findLocation(type) {
    var tile = map.getRandomTile('terrain');

    if (tile && type.isPassable(tile)) {
      return new Phaser.Point(tile.x, tile.y);
    }

    return findLocation(type);
  }

  return {
    /**
     * finds a valid random location for the given unit type
     * @param  {locationRule|moveable} forType type or moveable to find loaction for
     * @return {Phaser.Point}    random location on the board valid for given type
     */
    findRandomLocation: function findRandomLocation(forType) {
      return findLocation(forType);
    }
  };
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomTileGetter = randomTileGetter;
function randomTileGetter(game, map) {
  return {
    getRandomTile: function getRandomTile(layer) {
      var x = Math.floor((game.world.randomX - map.tileWidth) / map.tileWidth);
      var y = Math.floor((game.world.randomY - map.tileHeight) / map.tileHeight);
      return map.getTile(x, y, layer);
    }
  };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
var Crosshairs = function (_Phaser$Sprite) {
  _inherits(Crosshairs, _Phaser$Sprite);

  //initialization code in the constructor
  function Crosshairs(game, x, y, frame) {
    _classCallCheck(this, Crosshairs);

    //set size
    var _this = _possibleConstructorReturn(this, (Crosshairs.__proto__ || Object.getPrototypeOf(Crosshairs)).call(this, game, x, y, 'crosshairs', frame));

    _this.width = 35;
    _this.scale.y = Math.abs(_this.scale.x);

    _this.anchor.setTo(0.5, 0.5);
    return _this;
  }

  _createClass(Crosshairs, [{
    key: 'update',
    value: function update() {
      this.x = this.game.input.mousePointer.x;
      this.y = this.game.input.mousePointer.y;
    }
  }]);

  return Crosshairs;
}(Phaser.Sprite);

exports.default = Crosshairs;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationRule = locationRule;
/**
 * creats a location rule object
 * @param  {[type]} typeName    [description]
 * @param  {[type]} permissions [description]
 * @return {Object}             [description]
 */
function locationRule(typeName, permissions) {
  permissions = permissions || {};
  var state = {};
  state.passable = permissions.passable;
  state.impassable = permissions.impassable;

  return {

    /**
     * checks if the given location rule can be put on the given tile
     * @param  {[type]} type [description]
     * @param  {[type]} tile [description]
     * @return {[type]}      [description]
     */
    isPassable: function isPassable(tile) {

      if (state.impassable && state.impassable.indexOf(tile.terrainType) > -1) {
        return false;
      }

      if (state.passable && state.passable.indexOf(tile.terrainType) > -1) {
        return true;
      }

      // all others are false
      if (state.passable) return false;

      // all others are true
      if (state.impassable) return true;

      // can be put on all terrain
      return true;
    }
  };
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectable = selectable;

var _marker = __webpack_require__(1);

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectable(state) {
  state.selected = state.selected || false;

  var selector = (0, _marker2.default)();
  state.sprite.inputEnabled = true;

  state.sprite.events.onInputDown.add(function () {

    state.selected = !state.selected;
  });

  state.sprite.update = function () {};

  window.soldier = state;

  return {

    select: function select() {
      state.selected = true;
    },

    deselect: function deselect() {
      state.selected = false;
    }
  };
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorService = selectorService;
function selectorService(game, tileSize, marker) {

  var selectorStates = {
    Active: {
      opacity: 1,
      color: 0x00ff00

    },

    Off: {
      opacity: 0,
      color: 0x000000
    }
  };

  return function (loc) {

    return marker(game, loc.x, loc.y, tileSize, selectorStates);
  };
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(0);

var _phaser2 = _interopRequireDefault(_phaser);

var _selectable = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
function soldiers(map, loc, player) {
  var state = {};
  state.player = player;
  var worldX = loc.x * map.tileWidth;
  var worldY = loc.y * map.tileHeight;

  state.sprite = player.create(worldX, worldY, 'soldiers');
  return Object.assign({}, (0, _selectable.selectable)(state));
}

exports.default = soldiers;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
var Target = function (_Phaser$Sprite) {
  _inherits(Target, _Phaser$Sprite);

  //initialization code in the constructor
  function Target(game, x, y, frame) {
    _classCallCheck(this, Target);

    //setup physics properties
    var _this = _possibleConstructorReturn(this, (Target.__proto__ || Object.getPrototypeOf(Target)).call(this, game, x, y, 'target', frame));

    _this.anchor.setTo(0.5, 0.5);
    _this.game.physics.arcade.enableBody(_this);
    _this.body.collideWorldBounds = true;

    //set click event
    _this.inputEnabled = true;
    _this.events.onInputDown.add(_this.clicked, _this);

    //setup audio
    _this.ding = _this.game.add.audio('ding');

    //set size
    _this.width = 100;
    _this.scale.y = Math.abs(_this.scale.x);

    // add animations from spritesheets
    _this.animations.add('idling', null, 5, true);
    _this.animations.play('idling');

    _this.changeDirection();
    return _this;
  }

  _createClass(Target, [{
    key: 'changeDirection',
    value: function changeDirection() {
      var spd = 400;
      this.body.velocity.y = Math.random() * spd * 2 - spd;
      this.body.velocity.x = Math.random() * spd * 2 - spd;

      this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.changeDirection, this);
    }
  }, {
    key: 'clicked',
    value: function clicked() {
      this.ding.play();

      this.game.global.score++;
    }
  }]);

  return Target;
}(Phaser.Sprite);

exports.default = Target;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map