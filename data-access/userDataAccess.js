const User = require('../models/userModel')

const createUser = (data) => {
  return User.create(data)
}

const findUser = (query, projection) => {
  return User.findOne(query, projection)
}

const findUsers = (query, projection) => {
  return User.find(query, projection)
}

const findByIdAndUpdateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data)
}

module.exports = {
  createUser,
  findUser,
  findUsers,
  findByIdAndUpdateUser,
}
