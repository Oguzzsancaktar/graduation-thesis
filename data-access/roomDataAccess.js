const Room = require('../models/roomModel')

const createRoom = (data) => {
  return Room.create(data)
}

const findRoom = (query, projection) => {
  return Room.findOne(query, projection)
}

const findRooms = (query, projection) => {
  return Room.find(query, projection)
}

const findByIdAndUpdateRoom = (id, data) => {
  return Room.findByIdAndUpdate(id, data)
}

module.exports = {
  createRoom,
  findRoom,
  findRooms,
  findByIdAndUpdateRoom,
}
