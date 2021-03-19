const express = require('express');
const Router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');

// Signup
Router.post('/signup', async (req, res) => {
  const userdata = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await userdata.save();
  try {
    res.status(201).json({ message: 'Registration Successfully', status: true });
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

// Check If user Loged in or not
Router.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Login
Router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await User.findOne({ email: email });
    if (useremail) {
      bcrypt.compare(password, useremail.password, (error, response) => {
        if (response) {
          req.session.user = { user: { id: useremail._id, name: useremail.name } };
          console.log(req.session.user);
          res.status(200).json({ message: 'Login Success', status: true });
        } else {
          res.status(200).json({ message: 'Invalid Login Details', status: false });
        }
      });
    } else {
      res.status(200).json({ message: 'Invalid Login Detailsaa', status: false });
    }
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

module.exports = Router;
