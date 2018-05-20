const gamestore = require('../src/gamestore')
const Game = require('../src/game')
const Player = require('../src/player')
const assert = require('assert')

const {mockState} =  require('./mocks')
const {mockEvents} =  require('./mocks')

describe('gamestore', function() {
  describe('SETUP_NEW_GAME event', function() {
    it('Should add the state\'s currentPlayer to the game created', function() {
      const state = mockState()
      state.currentPlayer = Player({name: 'Percy'})
      const game = Game()
      const events = {}
      const pubsub = mockEvents(events)
      gamestore(state, pubsub)
      events[state.events.SETUP_NEW_GAME](game)

      assert.equal(game.players[0].name, 'Percy')
    });
  });
  describe('UPDATE_MAX_PLAYERS event', function() {
    const maxPlayers = 10
    it('Should update the maxPlayers state\'s currentGame', function() {
      const state = mockState()
      state.currentGame = Game()
      const events = {}
      const emmitted = {}
      const pubsub = mockEvents(events, emmitted)
      gamestore(state, pubsub)
      emmitted[state.events.RENDER] = function(){}
      events[state.events.UPDATE_MAX_PLAYERS](maxPlayers)

      assert.equal(state.currentGame.maxPlayers, maxPlayers)
    });
    it('Should emit RENDER after maxPlayers has been updated for state\'s currentGame', function() {
      let hasRendered = false

      const state = mockState()
      state.currentGame = Game()
      const events = {}
      const emmitted = {}
      const pubsub = mockEvents(events, emmitted)
      gamestore(state, pubsub)
      emmitted[state.events.RENDER] = function(){ hasRendered = true }
      events[state.events.UPDATE_MAX_PLAYERS](maxPlayers)

      assert.ok(hasRendered)
    });
  });
});
