
export function locationFinder(Phaser, game, map){


    function findLocation(type) {
      const tile = map.getRandomTile('terrain');
      
      if(tile && type.isPassable(tile)) {
        return new Phaser.Point(tile.x, tile.y);
      }


      return findLocation(type);
    }

    return {
      /**
       * finds a valid random location for the given unit type
       * @param  {locationRule|moveable} forType type or moveable to find loaction for
       * @return {Phaser.Point}    random location on the board valid for given type
       */
      findRandomLocation(forType) {
        return findLocation(forType);
      }
    }
}
