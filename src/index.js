require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8000;

// Import Routes
const Posts = require('./routes/posts');
const Users = require('./routes/users');

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    key: 'userId',
    secret: 'pankajchauhan',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Middleware Route
app.use('/post', Posts);
app.use('/user', Users);

// listening Server
app.listen(PORT, () => {
  console.log(`Connection listening on ${PORT}`);
});
