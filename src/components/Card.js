import { View } from 'react-native'
import { Avatar, Card, Text, Button } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { RemoveWeek } from '../features/program/weeks/RemoveWeek'
import { RemoveDay } from '../features/program/weeks/days/RemoveDay'
import { RemoveExercise } from '../features/program/weeks/days/exercises/RemoveExercise'
import { useDispatch, useSelector } from 'react-redux'
import {
  dayRemoved,
  dayUpdated,
  exerciseRemoved,
  exerciseUpdated,
  weekRemoved,
  weekUpdated,
} from '../features/programSlice'
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
  onClick,
  onDrag,
}) => {
  const dispatch = useDispatch()
  // console.log(`this is the weekId: ${weekId}`)
  const days = useSelector((state) => {
    const week = state.program.weeks.find((week) => week.id === weekId)
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
        {week.days && days.length === 1 && (
          <Text variant="bodyMedium" className="italic">
            contains {week.days.length} day
          </Text>
        )}
        {week.days && days.length !== 1 && (
          <Text variant="bodyMedium" className="italic">
            contains {week.days.length} days
          </Text>
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
        {day.exercises && day.exercises.length === 1 && (
          <Text variant="bodyMedium" className="italic">
            contains {day.exercises.length} exercise
          </Text>
        )}
        {day.exercises && day.exercises.length !== 1 && (
          <Text variant="bodyMedium" className="italic">
            contains {day.exercises.length} exercises
          </Text>
        )}
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
  exercise,
  weekId,
  dayId,
  exerciseId,
  title,
  content,
  onRemove,
  onEdit,
  onClick,
  onDrag,
}) => {
  const dispatch = useDispatch()
  console.log(exercise)
  return (
    <Card style={styles.container} onPress={onClick} onLongPress={onDrag}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content className="border-2 border-red-500">
        <Text variant="titleLarge">{exercise.name}</Text>
        <View className="flex flex-row justify-evenly border-2 border-purple-500">
          <View className="border-2 border-orange-500">
            <Text variant="bodyMedium" className="italic">
              Warmup sets
            </Text>
            {exercise.warmup.sets.useRange ? (
              <>
                <Text>
                  {exercise.warmup.sets.min}-{exercise.warmup.sets.max} x{' '}
                  {exercise.warmup.reps.useRange ? (
                    <>
                      <Text>{exercise.warmup.reps.min}</Text>-
                      <Text>{exercise.warmup.reps.max}</Text>
                    </>
                  ) : (
                    <>
                      <Text>{exercise.warmup.reps.single}</Text>
                    </>
                  )}
                </Text>
              </>
            ) : (
              <>
                <Text>
                  {exercise.warmup.sets.single} x{' '}
                  {exercise.warmup.reps.useRange ? (
                    <>
                      <Text>{exercise.warmup.reps.min}</Text>-
                      <Text>{exercise.warmup.reps.max}</Text>
                    </>
                  ) : (
                    <>
                      <Text>{exercise.warmup.reps.single}</Text>
                    </>
                  )}
                </Text>
              </>
            )}
          </View>
          <View className="border-2 border-orange-500">
            <Text variant="bodyMedium" className="italic">
              Working sets
            </Text>
            {exercise.working.sets.useRange ? (
              <>
                <Text>
                  {exercise.working.sets.min}-{exercise.working.sets.max} x{' '}
                  {exercise.working.reps.useRange ? (
                    <>
                      <Text>{exercise.working.reps.min}</Text>-
                      <Text>{exercise.working.reps.max}</Text>
                    </>
                  ) : (
                    <>
                      <Text>{exercise.working.reps.single}</Text>
                    </>
                  )}
                </Text>
              </>
            ) : (
              <>
                <Text>
                  {exercise.working.sets.single} x{' '}
                  {exercise.working.reps.useRange ? (
                    <>
                      <Text>{exercise.working.reps.min}</Text>-
                      <Text>{exercise.working.reps.max}</Text>
                    </>
                  ) : (
                    <>
                      <Text>{exercise.working.reps.single}</Text>
                    </>
                  )}
                </Text>
              </>
            )}
          </View>
        </View>
      </Card.Content>
      <Card.Actions
        style={styles.cardActions}
        className="border-2 border-green-500"
      >
        <EditInfoModal
          data={{ exerciseId, weekId, dayId }}
          updateAction={(info) => {
            dispatch(
              exerciseUpdated({
                weekId,
                dayId,
                exerciseId,
                // more props to pass in
              })
            )
          }}
          entityType="Exercise"
          onRemove={() =>
            dispatch(exerciseRemoved({ weekId, dayId, exerciseId }))
          }
        />
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
