import { useDispatch } from 'react-redux'
import { exerciseRemoved } from '../../../../programSlice'
import { Button } from 'react-native-paper'

export const RemoveExercise = ({ weekId, dayId, exerciseId }) => {
  const dispatch = useDispatch()

  const onRemoveExerciseClicked = () => {
    dispatch(
      exerciseRemoved({
        weekId,
        dayId,
        exerciseId,
      })
    )
  }

  return (
    <Button
      icon="trash-can-outline"
      mode="outlined"
      onPress={onRemoveExerciseClicked}
    >
      Remove
    </Button>
  )
}
