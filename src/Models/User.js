const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
});

UserSchema.pre('save', async function (next) {
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  next();
});

module.exports = mongoose.model('users', UserSchema);
