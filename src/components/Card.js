import { useState, useEffect } from 'react'
import { Avatar, Button, Card as PaperCard, Text, TextInput } from 'react-native-paper'
import programsService from "../services/programs";

const LeftComponent = props => <Avatar.Icon {...props} icon="folder" />

const Card = (
  {
    title="Default Title", 
    subtitle=null, 
    clickAction=null, 
    exercise=null, 
    program=null,
    week=null,
    day=null
  }
) => {

  const [weightValue, setWeightValue] = useState(exercise?.weight.value || '')

  if (exercise) {
    // console.log('program')
    // console.log(program.id)
    // console.log('exercise')
    // console.log(exercise._id)
    // console.log('week')
    // console.log(week._id)
    // console.log('day')
    // console.log(day._id)
  }

  const handleWeightChange = value => {
    setWeightValue(value)
  }

  useEffect(() => {
    // save weight to server when it's changed
    const updateWeightValue = async () => {
      console.log(`hello from the inside of useEffect`)
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
      // implement logic to save weight to server--can make API call to update the weight
      // need program ID week ID day ID and exercise ID to make change
      // programsService.updateExerciseWeight()
  }, [weightValue, exercise])

  return (
    <PaperCard>
      {exercise ? (
          <>
            <PaperCard.Title title={exercise.name}/>
            <PaperCard.Content>
              <Text variant='bodySmall'>{exercise.notes}</Text>
              {exercise.warmupSets.min === exercise.warmupSets.max ? (
                <Text variant='bodyMedium'>warm up sets: {exercise.warmupSets.min}</Text>

              ) : (
                <Text variant='bodyMedium'>warm up sets: {exercise.warmupSets.min}-{exercise.warmupSets.max}</Text>
              )}
              {exercise.workingSets.min === exercise.workingSets.max ? (
                <Text variant='bodyMedium'>working sets: {exercise.workingSets.min} x {exercise.reps.min}-{exercise.reps.max} reps {exercise.reps.notes && ` (${exercise.reps.notes})`}</Text>

              ) : (
                <Text variant='bodyMedium'>working sets: {exercise.workingSets.min}-{exercise.workingSets.max} x {exercise.reps.min}-{exercise.reps.max} reps ({exercise.reps.notes})</Text>
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
      {/* <PaperCard.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <PaperCard.Actions>
        {/* <Button>Cancel</Button> */}
        {/* <Button>Ok</Button> */}
      </PaperCard.Actions>
    </PaperCard>
  )
}

export default Card