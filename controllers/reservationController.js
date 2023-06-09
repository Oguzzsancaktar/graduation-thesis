const dataAccess = require('../data-access')
const { StatusCodes } = require('http-status-codes')

// CRUD
const createReservation = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.reservationDataAccess.createReservation(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getReservations = async (req, res) => {
  const { search, size, status } = req.query
  try {
    const reservations = await dataAccess.reservationDataAccess.findReservations(req.query)
    res.status(StatusCodes.OK).json(reservations)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateReservation = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.reservationDataAccess.findByIdAndUpdateReservation(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getReservation = async (req, res) => {
  const { reservationId } = req.query
  try {
    const reservation = await dataAccess.reservationDataAccess.findReservation(reservationId)
    res.status(StatusCodes.OK).json(reservation)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
}
