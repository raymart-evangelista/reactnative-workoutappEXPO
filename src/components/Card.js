import { useState, useEffect } from 'react'
import { Button, Card as PaperCard, Text, TextInput, RadioButton, } from 'react-native-paper'
import { View } from 'react-native';
import programsService from "../services/programs";
import SetTracker from './SetTracker';
import { setIn } from 'formik';

const Card = (
  {
    title="Default Title", 
    subtitle=null, 
    exercise=null, 
    program=null,
    week=null,
    day=null
  }
) => {

  const [weightValue, setWeightValue] = useState(program?.weekDetails
    .find((w) => w._id === week._id).dayDetails.find((d) => d._id === day._id)
    .exercises.find((e) => e._id === exercise._id).weight.value || exercise?.weight.value || '')

  const handleWeightChange = value => {
    setWeightValue(value)
  }

  const [setCompletionStatus, setSetCompletionStatus] = useState([])

  // track which sets have been completed for both warmups and working sets
  // when we connect backend, these might have to change to fill with whatever the backend sends

  if (exercise) {
    const [warmupSetsCompletion, setWarmupSetsCompletion] = useState(new Array(exercise.warmupSets.max).fill(false));
    const [workingSetsCompletion, setWorkingSetsCompletion] = useState(new Array(exercise.workingSets.max).fill(false));
  }


  const handleSetCompletion = (setType, setIndex, completionStatus) => {

    if (setType === 'warmup') {
      const updatedWarmupCompletion = [...warmupSetsCompletion]
      updatedWarmupCompletion[setIndex] = completionStatus
      setWarmupSetsCompletion(updatedWarmupCompletion)
    } else if (setType === 'working') {
      const updatedWorkingCompletion = [...workingSetsCompletion]
      updatedWorkingCompletion[setIndex] = completionStatus
      setWorkingSetsCompletion(updatedWorkingCompletion)
    }

    // update the completion status in local state
    // const updatedStatus = [...setCompletionStatus]
    // updatedStatus[setIndex] = { type: setType, completed: completionStatus }
    // setSetCompletionStatus(updatedStatus)

    // call backend to save the new completion status

    // optionally update the UI to reflect the changes
  }

  useEffect(() => {
    // save weight to server when it's changed
    const updateWeightValue = async () => {
      try {
        if (exercise && exercise.weight.value !== weightValue) {
          // const updatedExercise = { ...exercise, weight: { value: weightValue, unit: exercise.weight.unit}}
          const updatedExercise = await programsService.updateExerciseWeight(program.id, week._id, day._id, exercise._id, weightValue)
          // alert('Exercise weight updated successfully!')
        }
      } catch (error) {
        console.error('Failed to update exercise weight: ', error)
      }
    }

    updateWeightValue()
  }, [weightValue, exercise])

  return (
    <PaperCard>
      {exercise ? (
          <>
            <PaperCard.Title title={exercise.name}/>
            <PaperCard.Content>
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
                    onSetCompletion={handleSetCompletion}
                  />
                </View>
              )}
              {exercise.workingSets.min === exercise.workingSets.max ? (
                <Text variant='bodyMedium'>working sets: {exercise.workingSets.min} x {exercise.reps.min}-{exercise.reps.max} reps {exercise.reps.notes && ` (${exercise.reps.notes})`}</Text>

              ) : (
                <View>
                  <Text variant='bodyMedium'>working sets: {exercise.workingSets.min}-{exercise.workingSets.max} x {exercise.reps.min}-{exercise.reps.max} reps ({exercise.reps.notes})</Text>
                  <SetTracker
                    sets={exercise.workingSets.max}
                    type="working"
                    onSetCompletion={handleSetCompletion}
                  />
                </View>
                
              )}
              {exercise.reps.notes ? (
                <>
                <Text variant='bodySmall'></Text>
                </>
              ) : (
                <>
                </>
              )}
              <TextInput
                label={`weight (${exercise.weight.unit})`}
                value={`${weightValue}`}
                onChangeText={handleWeightChange}
                keyboardType='numeric'
                style={{ marginTop: 16 }}
              />
            </PaperCard.Content>
          </>
        ) : (
          <>
            <PaperCard.Title title={title} subtitle={subtitle} />
            <PaperCard.Content>
              {/* <Text variant="titleLarge">Card title</Text> */}
              {/* <Text variant='bodySmall'>{exercise.notes}</Text> */}
            </PaperCard.Content>
          </>
      )}
      <PaperCard.Actions>
        {/* <Button>Cancel</Button> */}
        {/* <Button>Ok</Button> */}
      </PaperCard.Actions>
    </PaperCard>
  )
}

export default Card