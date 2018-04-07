const faker = require('faker')
const uuid = require('uuid/v4')
const Game = require('./src/game')

var games = {};


exports.updateGame = function(game) {
  game = Game(game)
  game.id = game.id || uuid()
  game.title = game.title || faker.random.words()
  games[game.id] = game
  return game
}

exports.getGame = function(id) {
  if(!id) return Object.values(games);
  return games[id];
}
