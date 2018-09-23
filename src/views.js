const html = require('choo/html')
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

module.exports = {mainView, gameSelectionView}
