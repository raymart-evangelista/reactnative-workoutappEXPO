const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true
  },
  username: {
    required: true,
    type: String,
    unique: true
  },
  email: {
    required: true,
    type: String
  },
  passwordHash: {
    required: true,
    type: String
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)