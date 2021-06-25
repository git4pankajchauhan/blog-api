const express = require('express')
const Router = express.Router()
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth.middleware')

// Signup
Router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const isUser = await User.findOne({ email })
    if (isUser) throw Error('User already exists')

    const userdata = new User({ name, email, password })
    const savedUser = await userdata.save()
    if (!savedUser) throw Error('Something went wrong saving the user')

    res.status(201).json({ message: 'User is successfully resgistered.' })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// Login
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const userdata = await User.findOne({ email: email })
    if (!userdata) throw Error('User does not exist')

    const isMatch = await bcrypt.compare(password, userdata.password)
    if (!isMatch) throw Error('Invalid email or password.')

    const token = await userdata.generateAuthToken()
    const user = { _id: userdata._id, name: userdata.name, email: userdata.email }

    res.status(200).json({ message: 'User successfully login', token, user })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

Router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (!user) throw Error('User does not exist')
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
    res.status(200).json({ user: response })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = Router
