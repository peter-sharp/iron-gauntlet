import {loadImages} from './assetLoader'

export default function assetStore(state, events) {
  state.images = null;

  loadImages([
    'assets/tilemaps/tilemap.svg',
    'assets/images/soldiers.svg'
  ])
  .then((imgs) => {
    debugger
    state.images = imgs
    events.emit(state.events.RENDER)
  })
}
