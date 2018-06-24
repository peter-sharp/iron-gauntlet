const {renderMap} = require('renderMap')
const partial = require('lodash/fp/partial')
const html = require('choo/html')

module.exports = function mapSelectionView (game, state, emit) {

  return html`<section>
    <h6>Choose Map</h6>
    <ul class="map-options">
      ${game.mapOptions.map( map => {
        return html`<li id="${map.id}" onclick=${voteForMap} class="map-options__option ${state.mapVote == map.id ? 'option--voted' : ''}">${
          state.images ? state.mapCanvases[map.id].render(partial(renderMap, [state.images['/assets/tilemaps/tilemap.svg'], map])) : ''
        }</li>`
      })}
    </ul>
  </section>`

  function voteForMap(ev) {
    emit(state.events.MAP_VOTE, this.id)
  }
}
