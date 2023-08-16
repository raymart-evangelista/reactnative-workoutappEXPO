const compareSets = (currentSets, updatedSets) => {
  if (currentSets.min !== updatedSets.min) return true;
  if (currentSets.max !== updatedSets.max) return true;
  return false;
};

const compareExercises = (currentExercise, updatedExercise) => {
  if (compareSets(currentExercise.warmupSets, updatedExercise.warmupSets)) return true;
  if (compareSets(currentExercise.workingSets, updatedExercise.workingSets)) return true;
  return false;
};

const compareDays = (currentDay, updatedDay) => {
  for (let i = 0; i < currentDay.exercises.length; i++) {
    if (compareExercises(currentDay.exercises[i], updatedDay.exercises[i])) return true;
  }
  return false;
};

const programIsDifferent = (currentProgram, updatedProgram) => {
  for (let i = 0; i < currentProgram.weekDetails.length; i++) {
    for (let j = 0; j < currentProgram.weekDetails[i].dayDetails.length; j++) {
      if (compareDays(currentProgram.weekDetails[i].dayDetails[j], updatedProgram.weekDetails[i].dayDetails[j])) return true;
    }
  }
  return false;
};

module.exports = {
  programIsDifferent
}