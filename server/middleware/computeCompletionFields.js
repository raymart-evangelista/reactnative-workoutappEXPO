const { programIsDifferent } = require('../utils/programUtils')
const Program = require('../models/program')

module.exports = async (req, res, next) => {
  const { weekDetails } = req.body

  if (req.method === 'POST') {
    weekDetails.forEach(week => {
      week.dayDetails.forEach(day => {
        day.exercises.forEach(exercise => {
          exercise.warmupSetsCompletion = {
            individual: new Array(Number(exercise.warmupSets.max)).fill(false),
            overall: false
          }
          exercise.workingSetsCompletion = {
            individual: new Array(Number(exercise.workingSets.max)).fill(false),
            overall: false
          }
        })
      })
    })
  }

  // if (req.method === 'PATCH') {
  //   const currentProgram = await Program.findById(req.params.id)
  //   weekDetails.forEach((week, weekIndex) => {
  //     week.dayDetails.forEach((day, dayIndex) => {
  //       day.exercises.forEach((exercise, exerciseIndex) => {
  //         const currentExercise = currentProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]
  //         const updatedExercise = weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]

  //         if (currentExercise && updatedExercise) {
  //           console.log('this is the exercise warmup sets max: ')
  //           console.log(exercise.warmupSets.max)
  //           exercise.warmupSetsCompletion = {
  //             individual: new Array(Number(exercise.warmupSets.max)).fill(false),
  //             overall: false
  //           }
  //           // exercise.workingSetsCompletion = {
  //           //   individual: new Array(Number(exercise.workingSets.max)).fill(false),
  //           //   overall: false
  //           // }
  //         }
  //       })
  //     })
  //   })
  // }
  next()
}