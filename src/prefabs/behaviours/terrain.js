export function terrain(type, movementCost){

  movementCost = movementCost || 0;

  return {
    get terrainType() {return type}
  }
}
