const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
  name: String,
  status: {
    type: Number,
    default: 0,
  },
})

module.exports = User = mongoose.model('Room', roomSchema)
