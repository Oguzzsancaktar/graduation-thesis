const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
  name: String,
  status: {
    type: Number,
    default: 0,
  },
})

module.exports = Room = mongoose.model('Room', roomSchema)
