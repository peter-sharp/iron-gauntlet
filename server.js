const playerStore = require('./playerStore')
const Game = require('./src/game')
const clientApp = require('./src/app')
const gameStore = require('./gameStore')
const cheerio = require('cheerio')
const fs = require('fs')

const path = require('path')

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

clientApp.use(gameStore)

app.get('/games/:game', handleClientRoute)

function handleClientRoute (req, res) {
  let currentGame = gameStore.getGame(req.params.game)
  console.info(req.params.game, currentGame)
  if(req.params.game && !currentGame) {
    res.redirect('/')
    return
  }

  fs.readFile('./public/index.html', (err, data) => {
    if (err) throw err;

    let initialState = {
      games: gameStore.getGames(),
      currentGame
    }

    let $ = cheerio.load(data)
    let $app = cheerio('main', clientApp.toString(req.url, initialState))
    $(".iron-gauntlet").append($app.html())
    $("body").prepend(`<script>window.initialState = ${JSON.stringify(initialState)}</script>`)
    res.send($.html())
  });

}


io.on('connection', socket => {
  console.info('A player connected')

  socket.emit('games', gameStore.getGames())

  socket.on('disconnect', function(){
    // TODO remove player
    playerStore.removePlayerBySocketId(socket)
    console.info('A player disconnected')
  });

  socket.on('createGame', game => {

    game = gameStore.updateGame(game)
    socket.emit('gameCreated', game)
    console.info('gameCreated', game)
  })

  socket.on('joinGame', (id, player) => {
    player.gameId = id
    playerStore.updatePlayer(socket, player)
    player = playerStore.getPlayerById(player)
    let game = gameStore.getGame(id)


    addPlayerToGame(game, player, socket)

  })


  function addPlayerToGame(game, player, socket) {
    game = Game.addPlayer(game, player)
    game = gameStore.updateGame(game)
    socket.join(`game_${game.id}`)

    socket.broadcast.to(`game_${game.id}`).emit('addPlayer', player)
    socket.emit('joinedGame', game)
    console.info(`player ${player.name}(${player.id}) added to game ${game.title}(${game.id})`, game)
  }
})



http.listen(PORT, () => {
  console.log(`iron gauntlet started on port ${PORT}`)
})
