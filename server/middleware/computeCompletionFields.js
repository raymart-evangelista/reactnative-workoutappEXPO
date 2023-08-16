module.exports = (req, res, next) => {
  const { weekDetails } = req.body
  // console.log(weekDetails)

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
  });

  next()
}