const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  surname: String,
  password: String,
  email: String,
  status: {
    type: Number,
    default: 0,
  },
  role: {
    type: Number,
    default: 1,
  },
})

module.exports = User = mongoose.model('User', userSchema)
