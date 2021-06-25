require('dotenv').config()
require('./config/db')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 5000

// Import Routes
const Post = require('./routes/post')
const User = require('./routes/auth')

// Middleware
// app.use(cors());
app.use(
  cors({
    // origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
)
app.use(cookieParser())
app.use(bodyParser.json())

// app.use(
//   session({
//     key: 'userId',
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24 * 30,
//     },
//   })
// )

// Middleware Route
app.use('/post', Post)
app.use('/auth', User)

// listening Server
app.listen(PORT, () => {
  console.log(`Connection listening on ${PORT}`)
})
