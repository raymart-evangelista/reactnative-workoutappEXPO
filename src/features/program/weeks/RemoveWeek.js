import { useDispatch } from 'react-redux'
import { weekRemoved } from '../../programSlice'
import { Button } from 'react-native-paper'

export const RemoveWeek = ({ weekId }) => {
  const dispatch = useDispatch()

  const onRemoveWeekClicked = () => {
    dispatch(
      weekRemoved({
        id: weekId,
      })
    )
  }

  return (
    <Button
      icon="trash-can-outline"
      mode="outlined"
      onPress={onRemoveWeekClicked}
    >
      Remove
    </Button>
  )
}
