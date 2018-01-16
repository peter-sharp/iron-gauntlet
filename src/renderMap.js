import partial from 'lodash/fp/partial'
import Map from './map'

export function renderMap(tileAtlas, canvas, map) {
    canvas.width = map.cols * map.tsize
    canvas.height = map.rows * map.tsize
    debugger
    var ctx = canvas.getContext("2d")

    Map.each(partial(renderTile, [tileAtlas, ctx]), map)

}

function renderTile(tileAtlas, ctx, tile, [r, c], map) {
        if (tile !== null) return
        ctx.drawImage(
            tileAtlas, // image
            (tile - 1) * map.tsize, // source x
            0, // source y
            map.tsize, // source width
            map.tsize, // source height
            c * map.tsize,  // target x
            r * map.tsize, // target y
            map.tsize, // target width
            map.tsize // target height
        );

}
