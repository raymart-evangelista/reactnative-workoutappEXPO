import { useDispatch } from 'react-redux'
import { dayRemoved } from '../../../programSlice'
import { Button } from 'react-native-paper'

export const RemoveDay = ({ weekId, dayId }) => {
  const dispatch = useDispatch()

  const onRemoveDayClicked = () => {
    dispatch(
      dayRemoved({
        weekId,
        dayId,
      })
    )
  }

  return (
    <Button
      icon="trash-can-outline"
      mode="outlined"
      onPress={onRemoveDayClicked}
    >
      Remove
    </Button>
  )
}
