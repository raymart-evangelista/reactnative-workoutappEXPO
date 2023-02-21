const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weeks: {
    type: Number,
    required: true
  },
  weekDetails: [{
    weekNum: {
      type: Number,
      required: true      
    },
  }]
})

module.exports = mongoose.model('Program', programSchema)