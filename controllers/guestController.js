const dataAccess = require('../data-access')
const { StatusCodes } = require('http-status-codes')

// CRUD
const createGuest = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.guestDataAccess.createGuest(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getGuests = async (req, res) => {
  const { search, size, status } = req.query
  try {
    const guests = await dataAccess.guestDataAccess.findGuests(req.query)
    res.status(StatusCodes.OK).json(guests)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateGuest = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.guestDataAccess.findByIdAndUpdateGuest(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getGuest = async (req, res) => {
  const { guestId } = req.params
  try {
    const guest = await dataAccess.guestDataAccess.findGuest(guestId)
    res.status(StatusCodes.OK).json(guest)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createGuest,
  getGuests,
  getGuest,
  updateGuest,
}
