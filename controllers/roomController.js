const dataAccess = require('../data-access')
const { StatusCodes } = require('http-status-codes')

// CRUD
const createRoom = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.roomDataAccess.createRoom(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRooms = async (req, res) => {
  const { search, size, status } = req.query
  try {
    const rooms = await dataAccess.roomDataAccess.findRooms(req.query)
    res.status(StatusCodes.OK).json(rooms)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateRoom = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.roomDataAccess.findByIdAndUpdateRoom(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRoom = async (req, res) => {
  const { roomId } = req.params
  try {
    const room = await dataAccess.roomDataAccess.findRoom(roomId)
    res.status(StatusCodes.OK).json(room)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getAvailableRooms = async (req, res) => {
  const { startDate, endDate } = req.body

  try {
    const allRooms = await dataAccess.roomDataAccess.findRooms()
    const reservations = await dataAccess.reservationDataAccess.findReservations({ startDate, endDate })

    const reservedRooms = reservations.map((reservation) => reservation.room._id.toString())

    const availableRooms = allRooms.filter((room) => !reservedRooms.includes(room._id.toString()))

    res.status(StatusCodes.OK).json(availableRooms)
  } catch (error) {}
}

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  getAvailableRooms,
}
