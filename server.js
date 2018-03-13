const playerStore = require('./playerStore')
const gameStore = require('./gameStore')
const path = require('path')
const uuid = require('uuid/v4');
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

io.on('connection', socket => {
  console.info('A player connected')
  playerStore.addPlayer(socket)
  socket.on('disconnect', function(){
    // TODO remove player
    console.info('A player disconnected')
  });

  socket.on('createGame', game => {
    game.id = uuid()
    gameStore.addGame(game)
    socket.emit('gameCreated', game)
  })
})



http.listen(PORT, () => {
  console.log(`iron gauntlet started on port ${PORT}`)
})
