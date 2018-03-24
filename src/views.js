import html from 'choo/html'
import {renderMap} from './renderMap'
import partial from 'lodash/fp/partial'
import times from 'lodash/fp/times'
import Game from './game'

export function mainView (subView, state, emit) {
  return html`<main>
                <h1>Iron Gauntlet</h1>
                ${subView(state, emit)}
              </main>`
}

export function gameSelectionView(state, emit) {
  return html`<ul class="edit-list">
                <li class="edit-list__item--add">
                  <button class="edit-list__add-symbol" onclick=${addGame}>+</button>
                </li>
                ${state.games.map(
                  game => html`<li id="${game.id}" class="edit-list__item">
                    <h2>${game.title}</h2>
                    <button onclick=${joinGame}>join</button>
                  </li>`)}
              </ul>`
              function addGame() {
                emit(state.events.CREATE_GAME)
              }

              function joinGame() {
                emit(state.events.JOIN_GAME, this.parentNode.id)
              }
}

export function setupMenuView (state, emit) {
  var game = state.currentGame
  var maxPlayers = game.maxPlayers
  var remainingSlots = maxPlayers - game.players.length
  var isOwner = Game.isOwner(game, state.currentPlayer)

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
                        <label>name <input type="text" value="${player.name}"/></label>
                        <label>colour <input type="color" value="#${player.colour}"></label>
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
                <section>
                  <h6>Choose Map</h6>
                  <ul class="map-options">
                    ${state.mapOptions.map( map => {
                      return html`<li id="${map.id}" class="map-options__option">${state.images ? state.mapCanvases[map.id].render(partial(renderMap, [state.images['assets/tilemaps/tilemap.svg'], map])) : ''}</li>`
                    })}
                  </ul>
                </section>
                <button type="submit">save</submit>
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
}

function displayIf(predicate, el, fallbackEl = '') {
  return predicate ? el : fallbackEl
}
