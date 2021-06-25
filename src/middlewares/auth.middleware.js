const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.header('x-access-token')
    console.log('x-access-token : ', token)
    if (!token) throw Error('No token, authorization denied.')

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

module.exports = auth
