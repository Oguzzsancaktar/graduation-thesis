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
      require: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = Guest = mongoose.model('Guest', guestSchema)
