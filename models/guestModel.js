const mongoose = require('mongoose')
const { Schema } = mongoose

const guestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      require: true,
    },
    birthdate: {
      type: Date,
      require: true,
    },
    passwordNo: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
)

module.exports = Guest = mongoose.model('Guest', guestSchema)
