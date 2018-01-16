import Map from './map';
import generateVoronoiMap from './voronoiMapGenerator'

import partial from 'lodash/fp/partial'
import TerrainType from './TerrainType'

const OPTION_COUNT = 5
const MAP_COLS = 40
const MAP_ROWS = 30

export function mapStore (state, events) {
  state.events.SET_CANVAS = 'setCanvas'
  state.terrainTypes = {
    land: TerrainType({name: 'land', ids: [1,2]}),
    water: TerrainType({name: 'water', ids: [0]})
  }
  state.mapCols = MAP_COLS
  state.mapRows = MAP_ROWS
  state.mapOptCount = OPTION_COUNT

  var generator = partial(generateVoronoiMap, [state.terrainTypes, 'water'])
  state.mapOptions = makeMapOptions(generator, state.mapOptCount, {cols: state.mapCols, rows: state.mapRows})

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

export default mapStore
