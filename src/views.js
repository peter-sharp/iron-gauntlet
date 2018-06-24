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
  let game = state.currentGame || {}
  let maxPlayers = game.maxPlayers
  game.players = game.players || []
  game.mapOptions = game.mapOptions || []
  let remainingSlots = maxPlayers - game.players.length
  let isOwner = Game.isOwner(game, state.currentPlayer)

  return html`<form onsubmit=${saveGame}>
                <section>
                  ${displayIf(
                    isOwner,
                    html`<p>
                      <label>Name</label>
                      <input type="text" value="${game.title}"/>
                    </p>`,
                    html`<h2>${game.title}</h2>`
                  )}

                  ${displayIf(
                    isOwner,
                    html`<p>
                            <label>Visibility</label>
                            <select>
                              <option>private</option>
                              <option>public</option>
                            </select>
                          </p>`)}
                  ${displayIf(
                    isOwner,
                    html`
                        <P>
                          <label>number of players</label>
                          <input type="number" oninput=${updateMaxPlayers} value="${maxPlayers}">
                        </p>`)}

                  <ul class="player-list">
                    ${game.players.map(player => displayIf(
                      player.id == state.currentPlayer.id,
                      html`
                      <li class="player-list__player" id="player-${player.id}-form">
                        <label>name <input type="text" name="name" value="${player.name}" onchange=${updateCurrentPlayer} /></label>
                        <label>colour <input type="color" name="colour" value="#${player.colour}" onchange=${updateCurrentPlayer} /></label>
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
  function updateMaxPlayers(ev) {
    ev.preventDefault()
    emit(state.events.UPDATE_MAX_PLAYERS, this.value)
  }

  function updateCurrentPlayer(ev) {
    emit(state.events.UPDATE_CURRENT_PLAYER, { [this.name]: this.value})

  }
}

function displayIf(predicate, el, fallbackEl = '') {
  return predicate ? el : fallbackEl
}

module.exports = {mainView, gameSelectionView, setupMenuView}
