const Map = require('./map')
const generateVoronoiMap = require('./voronoiMapGenerator')
const {CanvasComponent} = require('./CanvasComponent')

const partial = require('lodash/fp/partial')
const TerrainType = require('./TerrainType')

const OPTION_COUNT = 5
const MAP_COLS = 40
const MAP_ROWS = 30

function mapStore (state, events) {

  state.events.SETUP_NEW_GAME = state.events.SETUP_NEW_GAME || 'setupNewGame'
  state.events.LOBBY_JOINED = state.events.LOBBY_JOINED || 'lobbyJoined'

  state.terrainTypes = {
    land: TerrainType({name: 'land', ids: [1,2]}),
    water: TerrainType({name: 'water', ids: [0]})
  }
  state.mapCols = MAP_COLS
  state.mapRows = MAP_ROWS
  state.mapOptCount = OPTION_COUNT

  if(state.currentGame) {
    state.mapCanvases = createMapCanvases(state.currentGame.mapOptions)
  }

  events.on(state.events.SETUP_NEW_GAME, function setupMapOptions(game){
    let generator = partial(generateVoronoiMap, [state.terrainTypes, 'water'])
    game.mapOptions = makeMapOptions(generator, state.mapOptCount, {cols: state.mapCols, rows: state.mapRows})
    state.currentGame = game
  })

  events.on(state.events.LOBBY_JOINED, function setupCanvases (game) {
    state.mapCanvases = createMapCanvases(game.mapOptions)
  })
}

function makeMapOptions(generator, count, size) {
  var mapOptions = []
  for (var i = 0; i < count; i++) {
    mapOptions.push(makeMapOption(generator, size))
  }
  return mapOptions
}

function makeMapOption(generator, {cols, rows}){
  var map = Map({cols, rows})
  return generator(map);
}

function createMapCanvases(mapOptions) {
  return mapOptions.reduce((canvases, map) => {
    canvases[map.id] = CanvasComponent()
    return canvases
  }, {})
}

module.exports = mapStore
