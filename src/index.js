import Choo from 'choo'
import partial from 'lodash/fp/partial'
import io from 'socket.io-client'
import mapStore from './mapStore'
import playerStore from './playerStore'
import gameStore from './gameStore'
import assetStore from './assetStore'
import {mainView} from './views'
import {gameSelectionView} from './views'
import {setupMenuView} from './views'

const socket = io()
const app = Choo()

app.use(playerStore)

app.use(partial(gameStore, [socket]))
app.use(assetStore)
app.use(mapStore)

app.route('/', partial(mainView, [gameSelectionView]))
app.route('/games/:game', partial(mainView, [setupMenuView]))


app.mount('.iron-gauntlet')

// TODO hide during production
window.ironGauntlet = app
