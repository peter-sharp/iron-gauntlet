function TerrainType({name, ids = []}){

  if(!(this instanceof TerrainType)) return new TerrainType({name, ids})
  this.name = name
  this.ids = ids || []
}


module.exports = TerrainType
