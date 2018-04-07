import app from './app.js'
import io from 'socket.io-client'
import serverEvents from './serverEvents'
import gameStore from './gameStore'
import playerDb from './db/player'
import assetStore from './assetStore'
import partial from 'lodash/fp/partial'
const socket = io()
app.use(partial(serverEvents, [socket]))
app.use(assetStore)
app.use(gameStore)
app.use(playerDb)

app.mount('.iron-gauntlet')

// TODO hide during production
window.ironGauntlet = app
