import html from 'choo/html'



export function mainView (subView, state, emit) {
  return html`<main>
                ${subView(state, emit)}
              </main>`
}

export function setupMenuView (state, emit) {
  var players = state.playerCount
  return html`<form onsubmit="">
                <section>
                  <label>number of players</label>
                  <input type="number" min="${state.minPlayers}" max="${state.maxPlayers}" oninput=${addPlayers} value="${players}">
                  <ul>
                    ${state.players.map(player => html`
                      <li id="player-${player.id}-form">
                        <label>name <input type="text" value="${player.name}"/></label>
                        <label>colour <input type="color" value="#${player.colour}"></label>
                      </li>`
                    )}
                  </ul>
                </section>
                <section>
                  <h6>Choose Map</h6>
                  <ul>
                    <!-- state.mapOptions -->
                  </ul>
                </section>
                <button type="submit">play</submit>
              </form>`

  function addPlayers(ev) {
    ev.preventDefault()
    players = this.value
    emit(state.events.SET_PLAYERS, players)
  }
}
