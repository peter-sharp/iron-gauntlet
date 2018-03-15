import html from 'choo/html'
import {renderMap} from './renderMap'
import partial from 'lodash/fp/partial'
import times from 'lodash/fp/times'

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
                    <h2>${game.name}</h2>
                    <button>join</button>
                  </li>`)}
              </ul>`
              function addGame() {
                emit(state.events.CREATE_GAME)
              }
}

export function setupMenuView (state, emit) {
  var game = state.gamesIndexed[state.params.game]
  var maxPlayers = game.maxPlayers
  var remainingSlots = maxPlayers - game.players.length;


  return html`<form onsubmit=${saveGame}>
                <section>
                  <p>
                    <label>Name</label>
                    <input type="text" />
                  </p>
                  <p>
                    <label>Visibility</label>
                    <select>
                      <option>private</option>
                      <option>public</option>
                    </select>
                  </p>
                  <P>
                    <label>number of players</label>
                    <input type="number" oninput=${updateMaxPlayers} value="${maxPlayers}">
                  </p>
                  <ul>
                    ${game.players.map(player => html`
                      <li id="player-${player.id}-form">
                        <label>name <input type="text" value="${player.name}"/></label>
                        <label>colour <input type="color" value="#${player.colour}"></label>
                      </li>`
                    )}
                    ${times(i => html`
                      <li id="player-placeholder-${i}" class="player-placeholder"></li>`, remainingSlots)}
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
