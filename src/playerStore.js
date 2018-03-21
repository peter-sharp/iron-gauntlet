import makePlayer from './player.js'
const MAX_PLAYERS = 8
const MIN_PLAYERS = 2

function playerStore (state, events) {
  state.currentPlayer = makePlayer()

  events.on(state.events.SET_PLAYERS, (count) => {
    state.playerCount = count

    events.emit(state.events.RENDER);
  })
}

export default playerStore
