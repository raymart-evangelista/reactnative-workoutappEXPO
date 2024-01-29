const compareSets = (currentSets, updatedSets) => {
  if (currentSets.min !== parseInt(updatedSets.min)) return true;
  if (currentSets.max !== parseInt(updatedSets.max)) return true;
  return false;
};

const compareExercises = (currentExercise, updatedExercise, setType) => {
  if (
    setType == "warmupSets" &&
    compareSets(currentExercise.warmupSets, updatedExercise.warmupSets)
  )
    return true;
  if (
    setType == "workingSets" &&
    compareSets(currentExercise.workingSets, updatedExercise.workingSets)
  )
    return true;
  return false;
};

const setsAreDifferent = (currentProgram, updatedProgram, setType) => {
  for (
    let weekIndex = 0;
    weekIndex < currentProgram.weekDetails.length;
    weekIndex++
  ) {
    const week = currentProgram.weekDetails[weekIndex];
    for (let dayIndex = 0; dayIndex < week.dayDetails.length; dayIndex++) {
      const day = week.dayDetails[dayIndex];
      for (
        let exerciseIndex = 0;
        exerciseIndex < day.exercises.length;
        exerciseIndex++
      ) {
        const currentExercise =
          currentProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[
            exerciseIndex
          ];
        const updatedExercise =
          updatedProgram.weekDetails[weekIndex].dayDetails[dayIndex].exercises[
            exerciseIndex
          ];
        if (compareExercises(currentExercise, updatedExercise, setType)) {
          console.log("exercise warmup sets were different");
          return true;
        }
      }
    }
  }
  return false;
};

const warmupSetsAreDifferent = (currentProgram, updatedProgram) => {
  return setsAreDifferent(currentProgram, updatedProgram, "warmupSets");
};

const workingSetsAreDifferent = (currentProgram, updatedProgram) => {
  return setsAreDifferent(currentProgram, updatedProgram, "workingSets");
};

const identifyAndUpdateNewExercises = (currentProgram, updatedProgram) => {
  updatedProgram.weekDetails.forEach((week, weekIndex) => {
    week.dayDetails.forEach((day, dayIndex) => {
      day.exercises.forEach((exercise, exerciseIndex) => {
        if (isNewExercise(currentProgram, weekIndex, dayIndex, exercise)) {
          console.log(
            "server/utils/programUtils.js: new exercise found... populating... !",
          );
          exercise.warmupSetsCompletion = {
            individual: new Array(Number(exercise.warmupSets.max)).fill(false),
            overall: false,
          };
          exercise.workingSetsCompletion = {
            individual: new Array(Number(exercise.workingSets.max)).fill(false),
            overall: false,
          };
        }
      });
    });
  });
};

const isNewExercise = (currentProgram, weekIndex, dayIndex, exercise) => {
  return !currentProgram.weekDetails[weekIndex]?.dayDetails[
    dayIndex
  ]?.exercises.some((e) => e._id === exercise._id);
};

module.exports = {
  warmupSetsAreDifferent,
  workingSetsAreDifferent,
  identifyAndUpdateNewExercises,
};
