const express = require('express')
const app = express()
const helmet = require('helmet')
const path = require('path')

// cookie parser is needed to be able to use the information int the cookies object
const cookieParser = require('cookie-parser')

// secure the express appp
app.use(helmet())

// serve up static files
app.use(express.static('public'))

// parse incoming data
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// set view enging
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// handle message fail
app.use((req,res,next) => {
  if(req.query.msg === 'fail') {
    res.locals.msg = 'Sorry, either the username or password was incorrect. Please try again'
  } else {
    res.locals.msg = ''
  }

  next()
})

// routing
app.get('/', (req, res, next) => {
  // 2nd arg will be appended to res.locals
  res.send('everything is ok')
})

app.get('/login', (req, res, next) => {
  res.render('login')
})

app.post('/process_login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if(password === 'jt') {
    // res.cookie takes two arguments
    // 1. the name of the cookie
    // 2. the value of the cookie
    res.cookie('username', username)
    res.redirect('/welcome')
  } else {
    res.redirect('login?msg=fail')
  }
})

app.get('/welcome', (req, res, next) => {
  res.render('welcome', {
    username: req.cookies.username
  })
})

app.get('/logout', (req, res, next) => {
  // reset cookies
  // res.clearCookie takes 1 arg. The name of the cookie to be cleared
  res.clearCookie('username')
  res.redirect('/login')
})

app.listen(3000)
console.log('The server is listening on port 3000')
