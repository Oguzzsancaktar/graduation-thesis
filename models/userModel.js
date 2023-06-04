const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchme = new Schema({
  name: String,
  surname: String,
  password: String,
  email: String,
})

module.exports = User = mongoose.model('User', userSchme)
