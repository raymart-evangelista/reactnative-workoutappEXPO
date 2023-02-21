const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  weeks: {
    type: Number,
    required: true
  },
  // weekDetails: [{
  //   weekNum: {
  //     type: Number,      
  //   },
  //   days: [{
  //     dayNum: {
  //       type: Number,
  //     },
  //     exercises: [{
  //       name: {
  //         type: String,
  //       },
  //       sets: {
  //         type: String,
  //       },
  //       reps: {
  //         type: {
  //           min: Number,
  //           max: Number
  //         }
  //       },
  //       required
  //     }]
  //   }]
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Program', programSchema)