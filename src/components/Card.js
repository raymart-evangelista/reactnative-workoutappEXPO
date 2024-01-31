import { View } from 'react-native'
import { Avatar, Card, Text, Button } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { RemoveWeek } from '../features/weeks/RemoveWeek'
import { RemoveDay } from '../features/weeks/days/RemoveDay'
import { RemoveExercise } from '../features/weeks/days/exercises/RemoveExercise'
import { useDispatch, useSelector } from 'react-redux'
import { weekRemoved, weekUpdated } from '../features/weeksSlice'
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
}) => {
  const dispatch = useDispatch()
  const days = useSelector((state) => {
    const week = state.weeks.find((week) => week.id === weekId)
    return week ? week.days : []
  })

  return (
    <Card style={styles.container} onPress={onClick}>
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
          data={week}
          updateAction={weekUpdated}
          entityType="Week"
          onRemove={(weekId) => dispatch(weekRemoved({ id: weekId }))}
        />
      </Card.Actions>
    </Card>
  )
}

export const DayCard = ({
  weekId,
  dayId,
  title,
  content,
  onRemove,
  onEdit,
}) => {
  return (
    <Card style={styles.container}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium" className="italic">
          {content}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <RemoveDay weekId={weekId} dayId={dayId} />
        <Button icon="pencil-outline" onPress={onEdit}>
          Edit
        </Button>
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
