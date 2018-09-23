const {ifElse} = require('./utils.js')
const html = require('choo/html')
const times = require('lodash/fp/times')
const Game = require('./game')
const mapSelectionView = require('./mapSelection/view.js')

function gameSetupView (state, emit) {
  let game = state.currentGame || Game()
  let maxPlayers = game.maxPlayers
  let players =  [state.currentPlayer]
  game.mapOptions = game.mapOptions
  let remainingSlots = maxPlayers - game.players.length
  let isOwner = Game.isOwner(game, state.currentPlayer)

  return html`<form onsubmit=${playerReady}>
                <div class="overlay-basic ${ifElse(state.currentPlayer.isWaiting, '', 'hidden')}" >waiting on other players ...</div>
                <section>
                  ${ifElse(
                    isOwner,
                    html`<p>
                      <label>Name</label>
                      <input type="text" name="title" oninput=${updateCurrentGame} value="${game.title}"/>
                    </p>`,
                    html`<h2>${game.title}</h2>`
                  )}

                  ${ifElse(
                    isOwner,
                    html`<p>
                            <label>Visibility</label>
                            <select name="visibility" onchange=${updateCurrentGame}>
                              <option ${ifElse(game.visibility == 'private', 'selected', '')} >private</option>
                              <option ${ifElse(game.visibility == 'public', 'selected', '')} >public</option>
                            </select>
                          </p>`)}
                  ${ifElse(
                    isOwner,
                    html`
                        <P>
                          <label>number of players</label>
                          <input type="number" name="maxPlayers" oninput=${updateCurrentGame} value="${maxPlayers}">
                        </p>`)}

                  <ul class="player-list">
                    ${players.map(player => ifElse(
                      player.id == state.currentPlayer.id,
                      html`
                      <li class="player-list__player" id="player-${player.id}-form">
                        <label>name <input type="text" name="name" value="${player.name}" onchange=${updateCurrentPlayer} /></label>
                        <label>colour <input type="color" name="colour" value="${player.colour}" onchange=${updateCurrentPlayer} /></label>
                      </li>`,
                      html`
                      <li class="player-list__player" id="player-${player.id}-display">
                        <span>${player.name}</span>
                        <span class="lobby-player__colour" style="background-color: #${player.colour}"></span>
                      </li>`
                    ))}
                    ${times(i => html`
                      <li class="player-list__player player-list__player--placeholder" id="player-placeholder-${i}" ></li>`, remainingSlots)}
                  </ul>
                </section>
                ${mapSelectionView(game, state, emit)}
                <button class="button--primary" type="submit" ${ifElse(state.readyButtonEnabled, '', 'disabled')}>Ready</submit>
              </form>`
  function playerReady(ev) {
    ev.preventDefault()
    emit(state.events.UPDATE_CURRENT_PLAYER, {gameState: state.playerGameStates.WAITING})
  }
  function addName(ev) {
    emit(state.events.UPDATE_NAME, this.value)
  }
  function updateCurrentGame(ev) {
    ev.preventDefault()
    emit(state.events.UPDATE_CURRENT_GAME, {[this.name]: this.value})
  }

  function updateCurrentPlayer(ev) {
    emit(state.events.UPDATE_CURRENT_PLAYER, { [this.name]: this.value})

  }
}

module.exports = gameSetupView;
