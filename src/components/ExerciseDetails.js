import { Text, TextInput } from 'react-native-paper'
import { View } from 'react-native'
import SetTracker from './SetTracker'

const ExerciseDetails = ({ exercise, weightValue, handleWeightChange }) => {
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
          <SetTracker 
            sets={exercise.warmupSets.max} 
            type="warmup"
          />
        </View>
      )}
      {exercise.workingSets.min === exercise.workingSets.max ? (
        <View>
          <Text variant='bodyMedium'>working sets: {exercise.workingSets.min} x {exercise.reps.min}-{exercise.reps.max} reps {exercise.reps.notes && ` (${exercise.reps.notes})`}</Text>
        </View>
      ) : (
        <View>
          <Text variant='bodyMedium'>working sets: {exercise.workingSets.min}-{exercise.workingSets.max} x {exercise.reps.min}-{exercise.reps.max} reps ({exercise.reps.notes})</Text>
          <SetTracker
            sets={exercise.workingSets.max}
            type="working"
          />
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