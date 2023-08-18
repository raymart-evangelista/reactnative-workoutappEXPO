const { programIsDifferent } = require('../utils/programUtils')
const Program = require('../models/program')

module.exports = async (req, res, next) => {
  const { weekDetails } = req.body
  const currentProgram = await Program.findById(req.params.id)

  weekDetails.forEach((week, weekIndex) => {
    week.dayDetails.forEach((day, dayIndex) => {
      day.exercises.forEach((exercise, exerciseIndex) => {
        const currentExercise = currentProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]

        if (compareExercises(currentExercise, exercise)) {
          exercise.warmupSetsCompletion = {
            individual: new Array(Number(exercise.warmupSets.max)).fill(false),
            overall: false
          }
          exercise.workingSetsCompletion = {
            individual: new Array(Number(exercise.workingSets.max)).fill(false),
            overall: false
          }
        }
      })
    })
  });
  next()
}