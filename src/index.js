require('dotenv').config();
require('./config/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

// Import Routes
const Posts = require('./routes/posts');
const Users = require('./routes/users');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Middleware Route
app.use('/post', Posts);
app.use('/user', Users);

// listening Server
app.listen(PORT, () => {
  console.log(`Connection listening on ${PORT}`);
});
