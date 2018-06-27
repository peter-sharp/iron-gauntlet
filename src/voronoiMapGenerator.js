const Map = require('./map')

const random = require('lodash/fp/random')
const property = require('lodash/fp/property')
const partial = require('lodash/fp/partial')
const flow = require('lodash/fp/flow')
const values = require('lodash/fp/values')



const randomTerrainName = flow([values, randomPick, property('name')])

function randomPick(arr) {
  return arr[random(0, arr.length - 1)]
}

function makeTerrainPoint(terrainName, vec = []) {
  return {
    vec,
    terrainName
  }
}

function getTerrainTypeFromPoint(terrainTypes, defaultTerrainType, point) {
  return point ? terrainTypes[point.terrainName] : terrainTypes[defaultTerrainType]
}

const pickRandomTerrainId = flow([getTerrainTypeFromPoint, property('ids'), randomPick])



function GenerateVoronoiTilePattern(terrainIdPicker, points, map){

  return Map.map(function(id, vec) {
    var closest = Infinity
    var np = null
    for (var i = 0; i < points.length; i += 1) {
      var point = points[i]

      var distance = Map.distanceTo(point.vec, vec)

      if(Map.vecsEqual(point.vec, vec)) return terrainIdPicker(point);

      if( distance < closest){
        closest = distance;
        np = point;
      }

    }

    return terrainIdPicker(np)

  })
}


function generate(terrainTypes, defaultTerrainType, map) {
  var maxPoints = map.rows + map.cols / 4
  var vects = generateRandomVects(map, maxPoints)
  var points = vects.map(vec => makeTerrainPoint(randomTerrainName(terrainTypes), vec))
  const terrainIdPicker = partial(pickRandomTerrainId, [terrainTypes, defaultTerrainType])

  return GenerateVoronoiTilePattern(terrainIdPicker, points, map)
}

/**
 * creates randomly located points with a random tileType
 * @param  {[type]} max [description]
 * @return {[type]}           [description]
 */
function generateRandomVects(map, max = 14) {
  var vecs = []

  for(var p = 0; p < max; p += 1) {
    let vec = Map.getRndTileVect(map)

    vecs.push(vec)
  }

  return vecs
}

module.exports = generate
