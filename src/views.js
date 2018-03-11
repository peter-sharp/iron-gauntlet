import html from 'choo/html'
import {renderMap} from './renderMap'
import partial from 'lodash/fp/partial'

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
  var players = state.playerCount
  return html`<form onsubmit=${startGame}>
                <section>
                  <p>
                    <label>Name</label>
                    <input type="text" />
                  </p>
                  <P>
                    <label>number of players</label>
                    <input type="number" oninput=${addPlayers} value="${players}">
                  </p>
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
                  <ul class="map-options">
                    ${state.mapOptions.map( map => {
                      return html`<li id="${map.id}" class="map-options__option">${state.images ? state.mapCanvases[map.id].render(partial(renderMap, [state.images['assets/tilemaps/tilemap.svg'], map])) : ''}</li>`
                    })}
                  </ul>
                </section>
                <button type="submit">play</submit>
              </form>`
  function startGame(ev) {}
  function addName(ev) {
    emit(state.events.UPDATE_NAME, this.value)
  }
  function addPlayers(ev) {
    ev.preventDefault()
    emit(state.events.SET_PLAYERS, this.value)
  }
}
