import { View } from 'react-native'
import { Avatar, Card, Text, Button } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { RemoveWeek } from '../features/weeks/RemoveWeek'
import { RemoveDay } from '../features/weeks/days/RemoveDay'
import { RemoveExercise } from '../features/weeks/days/exercises/RemoveExercise'
import { useDispatch, useSelector } from 'react-redux'
import {
  dayRemoved,
  dayUpdated,
  weekRemoved,
  weekUpdated,
} from '../features/weeksSlice'
import EditInfoModal from './EditInfoModal'

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />

{
  /* 
  the title will be the Week number
  the content will be the day names and exercises
*/
}

export const WeekCard = ({
  week,
  weekId,
  title,
  description,
  onRemove,
  onEdit,
  onClick,
  onDrag,
  isActive,
}) => {
  const dispatch = useDispatch()
  const days = useSelector((state) => {
    const week = state.weeks.find((week) => week.id === weekId)
    return week ? week.days : []
  })

  return (
    <Card style={styles.container} onPress={onClick} onLongPress={onDrag}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium" className="italic">
          {description}
        </Text>
        {days.length > 0 && days.length == 1 && (
          <Text variant="bodySmall">Contains {days.length} day</Text>
        )}
        {days.length > 0 && days.length > 1 && (
          <Text variant="bodySmall">Contains {days.length} days</Text>
        )}
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <EditInfoModal
          data={{ ...week }}
          updateAction={(info) => {
            dispatch(
              weekUpdated({
                id: info.id,
                title: info.title,
                description: info.description,
              })
            )
          }}
          entityType="Week"
          onRemove={() => dispatch(weekRemoved({ id: weekId }))}
        />
      </Card.Actions>
    </Card>
  )
}

export const DayCard = ({
  weekId,
  dayId,
  day,
  title,
  content,
  onRemove,
  onEdit,
  onClick,
  onDrag,
}) => {
  const dispatch = useDispatch()
  return (
    <Card style={styles.container} onPress={onClick} onLongPress={onDrag}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium" className="italic">
          {content}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <EditInfoModal
          data={{ ...day, weekId }}
          updateAction={(info) => {
            dispatch(
              dayUpdated({
                weekId: info.weekId,
                dayId: info.id,
                title: info.title,
                description: info.description,
              })
            )
          }}
          entityType="Day"
          onRemove={() => dispatch(dayRemoved({ weekId, dayId: day.id }))}
        />
      </Card.Actions>
    </Card>
  )
}

export const ExerciseCard = ({
  weekId,
  dayId,
  exerciseId,
  title,
  content,
  onRemove,
  onEdit,
}) => {
  return (
    <Card style={styles.container}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Text variant="titleLarge">{exerciseId}</Text>
        <Text variant="bodyMedium" className="italic">
          {content}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <RemoveExercise weekId={weekId} dayId={dayId} exerciseId={exerciseId} />
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
})
