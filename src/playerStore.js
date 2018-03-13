import tinycolor from 'tinycolor2'
const MAX_PLAYERS = 8
const MIN_PLAYERS = 2

function playerStore (state, events) {
  state.events.SET_PLAYERS = 'setPlayers'
  state.minPlayers = MIN_PLAYERS
  state.maxPlayers = MAX_PLAYERS
  state.playerCount = 2
  state.players = makePlayers(state.playerCount)
  events.on(state.events.SET_PLAYERS, (count) => {
    state.playerCount = count
    state.players = makePlayers(state.playerCount, state.players)

    events.emit(state.events.RENDER);
  })
}

function makePlayers(count, players = []) {
  players = players.slice(0, count);
  for (var i = 0; i < count; i++) {
    players[i] = makePlayer(Object.assign({id: i}, players[i]))
  }
  return players
}

function makePlayer({id, name, colour}) {
  return {
    id,
    name: name || `player ${id + 1}`,
    colour: colour || getDefaultColour(id)
  }
}

function getDefaultColour(id){
  var percent = (id + 0.1)/MAX_PLAYERS
  var colour = tinycolor({h: percent * 255, s: 1, l: 0.5})
  return colour.toHex()
}

export default playerStore
