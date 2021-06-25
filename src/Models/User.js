const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    token: {
      type: String,
    },
  },
})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 })
    if (!token) throw Error('Couldnt sign the token')

    this.tokens.token = token
    await this.save()
    return token
  } catch (error) {
    console.log('jwt token error: ', error)
  }
}

module.exports = mongoose.model('users', UserSchema)
