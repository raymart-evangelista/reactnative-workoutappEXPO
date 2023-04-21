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
  },
  weekDetails: [{
    weekNum: Number,
    dayDetails: [{
      name: String,
      dayNum: Number,
      exercises: [{
        name: String,
        warmupSets: {
          min: Number,
          max: Number
        },
        workingSets: {
          min: Number,
          max: Number
        },
        reps: {
          min: Number,
          max: Number,
          notes: String
        },
        weight: {
          value: Number,
          unit: {
            type: String,
            enum: ['kgs', 'lbs']
          }
        },
        rpe: {
          min: Number,
          max: Number
        },
        rest: {
          value: Number,
          unit: {
            type: String,
            enum: ['seconds', 'minutes']
          }
        },
        notes: String
      }]
    }]
  }],
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