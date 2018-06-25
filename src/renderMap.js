const partial = require('lodash/fp/partial')
const Map = require('./map')

function renderMap(tileAtlas, map, ctx, canvas) {
    debugger
    canvas.width = map.cols * map.tsize
    canvas.height = map.rows * map.tsize

    Map.each(partial(renderTile, [tileAtlas, ctx]), map)

}

function renderTile(tileAtlas, ctx, tile, [r, c], map) {

        if (tile === null) return

        ctx.drawImage(
            tileAtlas, // image
            (tile) * map.tsize, // source x
            0, // source y
            map.tsize, // source width
            map.tsize, // source height
            c * map.tsize,  // target x
            r * map.tsize, // target y
            map.tsize, // target width
            map.tsize // target height
        );

}

module.exports = {renderMap}
