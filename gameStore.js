const faker = require('faker')
const uuid = require('uuid/v4')
const Game = require('./src/game')

let games = {};

function gameStore(state, events) {
  state.games = games
  state.currentGame = null
}

function updateGame(game) {
  game = Game(game)
  game.id = game.id || uuid()
  game.title = game.title || faker.random.words()
  games[game.id] = game
  return game
}

function getGame(id) {
  return id in games ? games[id] : false;
}

function getPublicGames() {
  console.info(games)
  return Object.values(games).filter(game => game.visibility == 'public')
}

gameStore.updateGame = updateGame
gameStore.getGame = getGame
gameStore.getPublicGames = getPublicGames

module.exports = gameStore
