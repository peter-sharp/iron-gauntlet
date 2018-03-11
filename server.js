const playerStore = require('playerStore')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

io.on('connection', socket => {
  console.info('A player connected')
  playerStore.addPlayer(socket)
  socket.on('disconnect', function(){
    // TODO remove player
    console.info('A player disconnected')
  });
})

app.listen(PORT, () => {
  console.log(`iron gauntlet started on port ${PORT}`)
})
