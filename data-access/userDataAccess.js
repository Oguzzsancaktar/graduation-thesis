const User = require('../models/userModel')

const createUser = (data) => {
  return User.create(data)
}

const findUser = (query, projection) => {
  return User.findOne(query, projection)
}

module.exports = {
  createUser,
  findUser,
}
