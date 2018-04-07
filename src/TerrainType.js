function TerrainType({name, ids = []}){

  if(!this) return new TerrainType({name, ids})
  this.name = name
  this.ids = ids || []
}


module.exports = TerrainType
