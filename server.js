const express = require('express')

const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

app.listen(8080, () => {
  console.log('iron gauntlet started')
})
