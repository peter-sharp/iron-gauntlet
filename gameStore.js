const faker = require('faker')
const uuid = require('uuid/v4')
const Game = require('./src/game')
const isMatch = require('lodash/fp/isMatch')
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

/**
 * gets games in game store with given where
 */
function getGames(where = {visibility: 'public'}) {
  let filteredGames = Object.values(games).filter(isMatch(where))
  console.info('games', filteredGames)
  return filteredGames
}

gameStore.updateGame = updateGame
gameStore.getGame = getGame
gameStore.getGames = getGames

module.exports = gameStore
