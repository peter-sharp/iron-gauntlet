export function TerrainType({name, ids = []}){
  
  if(!this) return new TerrainType({name, ids})
  this.name = name
  this.ids = ids || []
}


export default TerrainType
