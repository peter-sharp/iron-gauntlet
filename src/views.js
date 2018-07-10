const html = require('choo/html')
const {renderMap} = require('./renderMap')
const partial = require('lodash/fp/partial')
const times = require('lodash/fp/times')
const Game = require('./game')
const mapSelectionView = require('./mapSelection/view.js')


function mainView (subView, state, emit) {
  return html`<main>
                <h1>Iron Gauntlet</h1>
                ${subView(state, emit)}
              </main>`
}

function gameSelectionView(state, emit) {
  return html`<ul class="edit-list">
                <li class="edit-list__item edit-list__item--add button--add">
                  <button class="edit-list__add-symbol" onclick=${addGame}>+</button>
                </li>
                ${state.games.map(
                  game => html`<li id="${game.id}" class="edit-list__item edit-list__item--join">
                    <h2 class="edit-list__title">${game.title}</h2>
                    <button class="button--secondary" onclick=${joinGame}>join</button>
                  </li>`)}
              </ul>`
              function addGame() {
                emit(state.events.CREATE_GAME)
              }

              function joinGame() {
                emit(state.events.JOIN_GAME, this.parentNode.id)
              }
}

function setupMenuView (state, emit) {
  let game = state.currentGame || Game()
  let maxPlayers = game.maxPlayers
  let players =  [state.currentPlayer]
  game.mapOptions = game.mapOptions
  let remainingSlots = maxPlayers - game.players.length
  let isOwner = Game.isOwner(game, state.currentPlayer)

  return html`<form onsubmit=${saveGame}>
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
                <button class="button--primary" type="submit">save</submit>
              </form>`
  function saveGame(ev) {
    emit(state.events.SAVE_GAME, game)
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

function ifElse(predicate, val, defaultVal = '') {
  return predicate ? val : defaultVal
}

module.exports = {mainView, gameSelectionView, setupMenuView}
