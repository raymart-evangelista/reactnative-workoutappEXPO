import { useEffect, useState, useRef } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import { Button } from 'react-native-paper'

import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'

import { WeekCard, DayCard, ExerciseCard } from '../components/Card'

import { useDispatch, useSelector } from 'react-redux'
import { AddWeek } from '../features/program/weeks/AddWeek'
import { AddDay } from '../features/program/weeks/days/AddDay'
import { AddExercise } from '../features/program/weeks/days/exercises/AddExercise'
import {
  daysReordered,
  exercisesReordered,
  weeksReordered,
} from '../features/program/weeksSlice'

import { useThemedStyles } from '../styles/globalStyles'

const EditWeekScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const weekId = route.params.weekId
  const week = route.params.week

  const days = useSelector((state) => {
    const week = state.weeks.find((week) => week.id === weekId)
    return week ? week.days : []
  })

  const [isExtended, setIsExtended] = useState(false)

  const flatListRef = useRef(0)

  const handleScrollOffsetChange = (offset) => {
    const threshold = 10
    setIsExtended(offset < threshold)
  }

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <DayContainer
          weekId={weekId}
          day={item}
          index={item.index}
          // onDelete={() => handleRemoveDay(item)}
          onDrag={drag}
          isActive={isActive}
          navigation={navigation}
        />
      </ScaleDecorator>
    )
  }

  return (
    <View className="h-full">
      <SafeAreaView className="flex-1">
        <DraggableFlatList
          dragHitSlop={{ left: -50 }}
          data={days}
          onDragEnd={({ data }) =>
            dispatch(daysReordered({ weekId, newDaysOrder: data }))
          }
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          containerStyle={{ flex: 1 }}
          onScrollOffsetChange={handleScrollOffsetChange}
          ref={flatListRef}
        />
        <AddDay weekId={weekId} />
      </SafeAreaView>
    </View>
  )
}

const EditDayScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const weekId = route.params.weekId
  const dayId = route.params.day.id

  const exercises = useSelector((state) => {
    const week = state.weeks.find((week) => week.id === weekId)
    if (!week) return []

    const day = week.days.find((day) => day.id === dayId)
    return day ? day.exercises : []
  })

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <ExerciseContainer
          weekId={weekId}
          dayId={dayId}
          exercise={item}
          onDrag={drag}
          isActive={isActive}
          navigation={navigation}
        />
      </ScaleDecorator>
    )
  }
  return (
    <View className="h-full">
      <SafeAreaView className="flex-1">
        <DraggableFlatList
          dragHitSlop={{ left: -50 }}
          data={exercises}
          onDragEnd={({ data }) =>
            dispatch(
              exercisesReordered({ weekId, dayId, newExercisesOrder: data })
            )
          }
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          containerStyle={{ flex: 1 }}
        />
        <AddExercise weekId={weekId} dayId={dayId} />
      </SafeAreaView>
    </View>
  )
}

const ExerciseContainer = ({
  weekId,
  dayId,
  exercise,
  onDrag,
  isActive,
  navigation,
}) => {
  const handleEditExercise = () => {
    // navigation.navigate('EditExercise', { weekId, dayId, exercise })
    console.log('inside handleEditExercise')
  }
  return (
    <ExerciseCard
      exercise={exercise}
      weekId={weekId}
      dayId={dayId}
      exerciseId={exercise.id}
      onEdit={handleEditExercise}
      onClick={handleEditExercise}
      onDrag={onDrag}
    />
  )
}

const DayContainer = ({
  weekId,
  day,
  onDelete,
  onDrag,
  isActive,
  navigation,
}) => {
  const handleEditDay = () => {
    navigation.navigate('EditDay', { weekId, day })
  }

  return (
    <DayCard
      weekId={weekId}
      dayId={day.id}
      day={day}
      title={day.title}
      content={day.description}
      onEdit={handleEditDay}
      onClick={handleEditDay}
      onDrag={onDrag}
    />
  )
}

const WeekContainer = ({ week, onDelete, onDrag, isActive, navigation }) => {
  const handleEditWeek = () => {
    navigation.navigate('EditWeek', { weekId: week.id, week })
  }

  return (
    <WeekCard
      week={week}
      weekId={week.id}
      title={week.title}
      description={week.description}
      onEdit={handleEditWeek}
      onClick={handleEditWeek}
      onDrag={onDrag}
    />
  )
}

const CreateProgramScreen = ({ navigation }) => {
  const styles = useThemedStyles()
  const [disableAddWeekButton, setDisabledAddWeekButton] = useState(false)

  const onSubmit = (weeks) => console.log(weeks)

  const handleRemoveWeek = (weekToRemove) => {
    const keyToRemove = weekToRemove.key
    setWeeks((currentWeeks) =>
      currentWeeks.filter((week, index) => week.key !== keyToRemove)
    )
    console.log(`week with key [${keyToRemove}] removed`)

    if (weeks.length < 8) {
      setDisabledAddWeekButton(false)
    }
  }

  const dispatch = useDispatch()
  const weeks = useSelector((state) => state.weeks)

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <WeekContainer
          week={item}
          index={item.index}
          onDelete={() => handleRemoveWeek(item)}
          onDrag={drag}
          isActive={isActive}
          navigation={navigation}
        />
      </ScaleDecorator>
    )
  }

  const [isExtended, setIsExtended] = useState(false)

  const handleScrollOffsetChange = (offset) => {
    const threshold = 10
    setIsExtended(offset < threshold)
  }

  const flatListRef = useRef(0)

  useEffect(() => {
    if (weeks.length > 7) {
      setDisabledAddWeekButton(true)
    } else {
      setDisabledAddWeekButton(false)
    }
  }, [weeks])

  return (
    <View className="h-full">
      <SafeAreaView className="flex-1">
        <Button
          onPress={() => console.log(weeks)}
          style={styles.button}
          mode="contained"
          icon="check-all"
        >
          Submit New Program
        </Button>
        <DraggableFlatList
          data={weeks}
          onDragEnd={({ data }) => dispatch(weeksReordered(data))}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          containerStyle={{ flex: 1 }}
          onScrollOffsetChange={handleScrollOffsetChange}
          ref={flatListRef}
        />
        <AddWeek />
      </SafeAreaView>
    </View>
  )
}
export { CreateProgramScreen, EditWeekScreen, EditDayScreen }
