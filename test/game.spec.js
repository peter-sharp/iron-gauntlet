const Game = require('../src/game')
const Player = require('../src/player')
const assert = require('assert')

const {mockState} =  require('./mocks')
const {mockEvents} =  require('./mocks')

describe('Game', function() {
  describe('getPlayer', function() {
    it('Should get the player added to the game', function() {
      const game = Game()
      const playerId = 'abcdef2'
      const testPlayer = Player({name: 'Percy', id: playerId})
      game.players.push(testPlayer)
      const player = Game.getPlayer(game, playerId)
      assert.ok(player, 'getPlayer failed to return a player object')
      assert.deepEqual(player, testPlayer, 'getPlayer failed to get expected player named Percy')
    });
  });
});
