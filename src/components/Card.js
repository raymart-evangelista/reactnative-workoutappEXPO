import { useState, useEffect } from 'react'
import { Button, Card as PaperCard, Text, TextInput, RadioButton, } from 'react-native-paper'
import { View } from 'react-native';
import programsService from "../services/programs";
import SetTracker from './SetTracker';
import { setIn } from 'formik';
import ExerciseDetails from './ExerciseDetails';


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
              <ExerciseDetails
                exercise={exercise}
                weightValue={weightValue}
                handleWeightChange={handleWeightChange}
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