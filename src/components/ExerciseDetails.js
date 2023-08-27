import { Text, TextInput } from 'react-native-paper'
import { View } from 'react-native'
import SetTracker from './SetTracker'
// import useWarmupSetsCompletionIndividual from '../hooks/useSetsCompletionIndividual'
import useSetsCompletionIndividual from '../hooks/useSetsCompletionIndividual'

const ExerciseDetails = ({ program, week, day, exercise, weightValue, handleWeightChange }) => {
  const [warmupSetsCompletionIndividual, setWarmupSetsCompletionIndividual] = useSetsCompletionIndividual(
    "warmup",
    exercise.warmupSetsCompletion.individual,
    program,
    week,
    day,
    exercise
  )
  // const [workingSetsCompletionIndividual, setWorkingSetsCompletionIndividual] = useWorkingSetsCompletionIndividual(
  //   exercise.workingSetsCompletion.individual,
  //   program,
  //   week,
  //   day,
  //   exercise
  // )
  return (
    <>
      <Text variant='bodySmall'>{exercise.notes}</Text>
      {exercise.warmupSets.min === exercise.warmupSets.max ? (
        <View>
          <Text variant='bodyMedium'>warm up sets: {exercise.warmupSets.min}</Text>
        </View>
      ) : (
        <View>
          <Text variant='bodyMedium'>warm up sets: {exercise.warmupSets.min}-{exercise.warmupSets.max}</Text>
          {console.log('warmupSetsCompletionIndividual in ExerciseDetails:', warmupSetsCompletionIndividual)}
          <SetTracker 
            setsAmount={exercise.warmupSets.max} 
            setType="warmup"
            setsCompletionIndividual={warmupSetsCompletionIndividual}
            handleSetsCompletionIndividualChange={setWarmupSetsCompletionIndividual}
          />
        </View>
      )}
      {exercise.workingSets.min === exercise.workingSets.max ? (
        <View>
          <Text variant='bodyMedium'>working sets: {exercise.workingSets.min} x {exercise.reps.min}-{exercise.reps.max} reps {exercise.reps.notes && ` (${exercise.reps.notes})`}</Text>
        </View>
      ) : (
        <View>
          <Text variant='bodyMedium'>working sets: {exercise.workingSets.min}-{exercise.workingSets.max} sets x {exercise.reps.min}-{exercise.reps.max} reps ({exercise.reps.notes})</Text>
          {/* <SetTracker
            setsAmount={exercise.workingSets.max}
            setType="working"
            setsCompletionIndividual={}
            handleSetsCompletionIndividualChange={}
          /> */}
        </View>
      )}
      {exercise.reps.notes ? (
        <Text variant='bodySmall'>{exercise.reps.notes}</Text>
      ) : null}
      <TextInput
        label={`weight (${exercise.weight.unit})`}
        value={`${weightValue}`}
        onChangeText={handleWeightChange}
        keyboardType='numeric'
        style={{ marginTop: 16 }}
      />
    </>
  )
}

export default ExerciseDetails