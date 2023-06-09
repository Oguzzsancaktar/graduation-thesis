const Guest = require('../models/guestModel')

const createGuest = (data) => {
  return Guest.create(data)
}

const findGuest = (query, projection) => {
  return Guest.findOne(query, projection)
}

const findGuests = (query, projection) => {
  return Guest.find(query, projection)
}

const findByIdAndUpdateGuest = (id, data) => {
  return Guest.findByIdAndUpdate(id, data)
}

module.exports = {
  createGuest,
  findGuest,
  findGuests,
  findByIdAndUpdateGuest,
}
