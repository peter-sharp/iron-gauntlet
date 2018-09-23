const Choo = require('choo')
const partial = require('lodash/fp/partial')
const mapStore = require('./mapStore')
const mapSelectionStore = require('./mapSelection/store')
const playerStore = require('./playerStore')
const {mainView} = require('./views')
const {gameSelectionView} = require('./views')
const gameSetupView = require('./gameSetupView')

const app = Choo()

app.use(playerStore)

app.use(mapStore)
app.use(mapSelectionStore)

app.route('/', partial(mainView, [gameSelectionView]))
app.route('/games/:game', partial(mainView, [gameSetupView]))

module.exports = app
