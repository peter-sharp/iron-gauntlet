module.exports = function mapSelectionStore(state, events) {
  state.events.MAP_VOTE = 'mapVote'

  state.mapVote = null
  events.on(state.events.MAP_VOTE, function updateVote(id) {
    if(!state.mapVote) state.mapVote = id
    events.emit(state.events.CURRENT_GAME_UPDATED)
    events.emit(state.events.RENDER)
  })
}
