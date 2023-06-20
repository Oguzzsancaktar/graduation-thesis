const Reservation = require('../models/reservationModel')

const createReservation = (data) => {
  return Reservation.create(data)
}

const findReservation = (id) => {
  return Reservation.findById(id).populate('guest').populate('room')
}

const findReservations = (query, projection) => {
  const { guest, room, status, checkIn, startDate, endDate } = query

  const pipeline = []

  const $match = {}

  if (startDate && endDate) {
    $match.$or = [
      { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
      { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } },
    ]
  }

  pipeline.push({ $match })

  if (query.checkIn !== undefined) {
    pipeline.push({ $match: { checkIn: JSON.parse(checkIn) } })
  }

  if (query.status !== undefined) {
    pipeline.push({ $match: { status: +status } })
  }

  if (query.room) {
    pipeline.push({ $match: { room: room } })
  }

  if (query.guest) {
    pipeline.push({ $match: { guest: guest } })
  }

  pipeline.push({ $lookup: { from: 'rooms', localField: 'room', foreignField: '_id', as: 'room' } })
  pipeline.push({ $lookup: { from: 'guests', localField: 'guest', foreignField: '_id', as: 'guest' } })

  pipeline.push({ $unwind: '$room' })
  pipeline.push({ $unwind: '$guest' })

  pipeline.push({ $sort: { startDate: 1 } })

  return Reservation.aggregate(pipeline)
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
