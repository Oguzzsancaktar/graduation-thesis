const Reservation = require('../models/reservationModel')

const createReservation = (data) => {
  return Reservation.create(data)
}

const findReservation = (query, projection) => {
  return Reservation.findOne(query, projection).populate('guest').populate('room')
}

const findReservations = (query, projection) => {
  return Reservation.find(query, projection).populate('guest').populate('room')
}

const findByIdAndUpdateReservation = (id, data) => {
  return Reservation.findByIdAndUpdate(id, data)
}

module.exports = {
  createReservation,
  findReservation,
  findReservations,
  findByIdAndUpdateReservation,
}
