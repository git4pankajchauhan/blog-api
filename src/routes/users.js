const express = require('express');
const Router = express.Router();
const Signup = require('../Models/User');

// Registration
Router.post('/', async (req, res) => {
  const singup = new Signup({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await singup.save();
  try {
    res.status(201).json({ message: 'Registration Successfully', status: true });
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

module.exports = Router;
