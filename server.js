const playerStore = require('./playerStore')
const Game = require('./src/game')

const gameStore = require('./gameStore')

const path = require('path')

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

io.on('connection', socket => {
  console.info('A player connected')
  playerStore.updatePlayer(socket)

  socket.emit('games', gameStore.getGame().filter(game => game.visibility == 'public'))

  socket.on('disconnect', function(){
    // TODO remove player
    console.info('A player disconnected')
  });

  socket.on('createGame', game => {

    game = gameStore.updateGame(game)
    socket.emit('gameCreated', game)
  })

  socket.on('joinGame', (id, player) => {
    playerStore.updatePlayer(socket, player)
    player = playerStore.getPlayer(socket)
    let game = gameStore.getGame(id)


    addPlayerToGame(game, player, socket)

  })


  function addPlayerToGame(game, player, socket) {
    game = Game.addPlayer(game, player)
    game = gameStore.updateGame(game)
    socket.join(`game_${game.id}`)

    socket.broadcast.to(`game_${game.id}`).emit('addPlayer', player)
    socket.emit('joinedGame', game)
  }
})



http.listen(PORT, () => {
  console.log(`iron gauntlet started on port ${PORT}`)
})
