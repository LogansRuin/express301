const express = require('express')
const app = express()
const helmet = require('helmet')
const path = require('path')

// secure the express appp
app.use(helmet())

// serve up static files
app.use(express.static('public'))

// parse incoming data
app.use(express.json())
app.use(express.urlencoded())

// set view enging
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// routing
app.get('/', (reg, res, next) => {
  // 2nd arg will be appended to res.locals
  res.send('everything is ok')
})

app.listen(3000)
console.log('The server is listening on port 3000')