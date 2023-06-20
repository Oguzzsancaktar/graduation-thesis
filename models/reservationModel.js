const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'Guest',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  checkIn: {
    type: Boolean,
    required: false,
    default: false,
  },
})

module.exports = Reservation = mongoose.model('Reservation', reservationSchema)
