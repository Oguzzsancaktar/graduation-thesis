const dataAccess = require('../data-access')
const { StatusCodes } = require('http-status-codes')

// CRUD
const createUser = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.userDataAccess.createUser(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getUsers = async (req, res) => {
  const { search, size, status } = req.query
  try {
    const users = await dataAccess.userDataAccess.findUserWithFiltersAndPopulate(req.query)
    res.status(StatusCodes.OK).json(users)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateUser = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.userDataAccess.findByIdAndUpdateUser(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await dataAccess.userDataAccess.findUser()
    res.status(StatusCodes.OK).json(user)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeUser = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.userDataAccess.findByIdAndUpdateUser(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
}
