const Choo = require('choo')
const partial = require('lodash/fp/partial')
const mapStore = require('./mapStore')
const playerStore = require('./playerStore')
const {mainView} = require('./views')
const {gameSelectionView} = require('./views')
const {setupMenuView} = require('./views')

const app = Choo()

app.use(playerStore)

app.use(mapStore)

app.route('/', partial(mainView, [gameSelectionView]))
app.route('/games/:game', partial(mainView, [setupMenuView]))

module.exports = app
