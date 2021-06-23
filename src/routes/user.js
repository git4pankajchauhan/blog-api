const express = require('express')
const Router = express.Router()
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Signup
Router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userexist = await User.findOne({ email: email })
    if (userexist) {
      res.status(200).json({ message: 'User Already Exist.', status: false })
      return
    }
    const userdata = new User({ name, email, password })
    await userdata.save()
    res.status(201).json({ message: 'Registration Successfully', status: true })
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false })
  }
})

const verifyJWT = (req, res, next) => {
  const token = req.header('x-access-token')

  if (!token) {
    res.status(403).json({ isAuth: false })
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(403).json({ isAuth: false, message: 'You Failed to Authenticate' })
      } else {
        req.userId = decoded.id
        next()
      }
    })
  }
}

// verify the user
// Router.get('/is-user-auth', verifyJWT, (req, res) => {
//   res.send('yo, u are authenticated congrate!')
// })

// Check If user Loged in or not
Router.get('/login', verifyJWT, (req, res) => {
  if (req.session.user) {
    res.json({ isLogin: true, user: req.session.user })
  } else {
    res.status(403).json({ isLogin: false })
  }
})

// Login
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await User.findOne({ email: email })
    if (result) {
      bcrypt.compare(password, result.password, (error, response) => {
        if (response) {
          const userdata = { id: result._id, name: result.name, email: result.email }

          const token = jwt.sign({ id: userdata.id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 5 })

          req.session.user = userdata

          res.status(200).json({ status: true, isAuth: true, token, user: userdata })
        } else {
          res.status(200).json({ message: 'Invalid Login Details', status: false })
        }
      })
    } else {
      res.status(200).json({ message: 'Invalid Login Detailsaa', status: false })
    }
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false })
  }
})

// Check If user Loged in or not
Router.get('/logout', (req, res) => {
  req.session.destroy()
  res.send({ isLogin: false })
})

module.exports = Router
