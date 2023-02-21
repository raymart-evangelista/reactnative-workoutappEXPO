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
  weekDetails: [{
    weekNum: Number,
    dayDetails: [{
      dayNum: {
        type: Number,
      },
      exercises: [{
        name: {
          type: String,
        },
        warmupSets: {
          type: {
            min: Number,
            max: Number
          }
        },
        workingSets: {
          type: {
            min: Number,
            max: Number
          },
        },
        reps: {
          type: {
            min: Number,
            max: Number
          }
        },
        weight: {
          value: Number,
          uint: {
            type: String,
            enum: ['kgs', 'lbs']
          }
        },
        rpe: {
          type: {
            min: Number,
            max: Number
          }
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

// programSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

module.exports = mongoose.model('Program', programSchema)