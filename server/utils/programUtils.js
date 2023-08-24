const compareSets = (currentSets, updatedSets) => {
  if (currentSets.min !== parseInt(updatedSets.min)) return true;
  if (currentSets.max !== parseInt(updatedSets.max)) return true;
  return false;
};

const compareExercises = (currentExercise, updatedExercise, setType) => {
  if (setType == 'warmupSets' && compareSets(currentExercise.warmupSets, updatedExercise.warmupSets)) return true
  if (setType == 'workingSets' && compareSets(currentExercise.workingSets, updatedExercise.workingSets)) return true
  return false;
};

// const compareDays = (currentDay, updatedDay) => {
//   for (let i = 0; i < currentDay.exercises.length; i++) {
//     if (compareExercises(currentDay.exercises[i], updatedDay.exercises[i])) return true;
//   }
//   return false;
// };

// const programIsDifferent = (currentProgram, updatedProgram) => {
//   for (let weekIndex = 0; weekIndex < currentProgram.weekDetails.length; weekIndex++) {
//     const week = currentProgram.weekDetails[weekIndex]
//     for (let dayIndex = 0; dayIndex < week.dayDetails.length; dayIndex++) {
//       const day = week.dayDetails[dayIndex]
//       for (let exerciseIndex = 0; exerciseIndex < day.exercises.length; exerciseIndex++) {
//         const currentExercise = currentProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]
//         const updatedExercise = updatedProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]
//         if (compareExercises(currentExercise, updatedExercise)) {
//           console.log('exercise warmup sets were different')
//           return true
//         }
//       }
//     }
//   }
//   return false
// }

const setsAreDifferent = (currentProgram, updatedProgram, setType) => {
  for (let weekIndex = 0; weekIndex < currentProgram.weekDetails.length; weekIndex++) {
    const week = currentProgram.weekDetails[weekIndex]
    for (let dayIndex = 0; dayIndex < week.dayDetails.length; dayIndex++) {
      const day = week.dayDetails[dayIndex]
      for (let exerciseIndex = 0; exerciseIndex < day.exercises.length; exerciseIndex++) {
        const currentExercise = currentProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]
        const updatedExercise = updatedProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[exerciseIndex]
        if (compareExercises(currentExercise, updatedExercise, setType)) {
          console.log('exercise warmup sets were different')
          return true
        }
      }
    }
  }
  return false
}

const warmupSetsAreDifferent = (currentProgram, updatedProgram) => {
  return setsAreDifferent(currentProgram, updatedProgram, 'warmupSets')
}

const workingSetsAreDifferent = (currentProgram, updatedProgram) => {
  return setsAreDifferent(currentProgram, updatedProgram, 'workingSets')
}

module.exports = {
  warmupSetsAreDifferent,
  workingSetsAreDifferent
}