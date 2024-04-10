import { useEffect, useState, useRef } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'

import { WeekCard, DayCard, ExerciseCard } from '../components/Card'

import { useDispatch, useSelector } from 'react-redux'
import { AddWeek } from '../features/program/weeks/AddWeek'
import { AddDay } from '../features/program/weeks/days/AddDay'
import { AddExercise } from '../features/program/weeks/days/exercises/AddExercise'
// import {
//   daysReordered,
//   exercisesReordered,
//   weeksReordered,
// } from '../features/program/weeksSlice'

import {
  programRemoved,
  programUpdated,
  daysReordered,
  exercisesReordered,
  weeksReordered,
  resetProgram,
} from '../features/programSlice'

import { useThemedStyles } from '../styles/globalStyles'
import { Controller, useForm } from 'react-hook-form'
import EditInfoModal from '../components/EditInfoModal'
import { addProgram } from '../features/programsSlice'

const EditWeekScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const weekId = route.params.weekId
  const week = route.params.week

  const days = useSelector((state) => {
    const week = state.program.weeks.find((week) => week.id === weekId)
    return week ? week.days : []
  })

  const [isExtended, setIsExtended] = useState(false)

  const flatListRef = useRef(0)

  const handleScrollOffsetChange = (offset) => {
    const threshold = 10
    setIsExtended(offset < threshold)
  }

  console.log(days.length)
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
        {days.length > 0 ? (
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
        ) : (
          <View>
            <Text>No days added yet.</Text>
          </View>
        )}
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
    const week = state.program.weeks.find((week) => week.id === weekId)
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
        {exercises.length > 0 ? (
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
        ) : (
          <Text>No exercises added yet.</Text>
        )}
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

const WeekContainer = ({ week, onDrag, navigation }) => {
  const handleEditWeek = () => {
    navigation.navigate('EditWeek', { weekId: week.id, week })
  }

  return (
    <WeekCard
      week={week}
      weekId={week.id}
      title={week.title}
      description={week.description}
      onClick={handleEditWeek}
      onDrag={onDrag}
    />
  )
}

const CreateProgramScreen = ({ navigation }) => {
  const styles = useThemedStyles()

  // const [disableAddWeekButton, setDisabledAddWeekButton] = useState(false)
  // const handleRemoveWeek = (weekToRemove) => {
  //   const keyToRemove = weekToRemove.key
  //   setWeeks((currentWeeks) =>
  //     currentWeeks.filter((week, index) => week.key !== keyToRemove)
  //   )
  //   console.log(`week with key [${keyToRemove}] removed`)

  //   if (weeks.length < 8) {
  //     setDisabledAddWeekButton(false)
  //   }
  // }

  const dispatch = useDispatch()
  const program = useSelector((state) => state.program)
  const weeks = program.weeks

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <WeekContainer
          week={item}
          index={item.index}
          onDrag={drag}
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

  // useEffect(() => {
  //   console.log(`weeks have been effected: ${weeks.length}`)
  //   if (weeks.length > 7) {
  //     setDisabledAddWeekButton(true)
  //   } else {
  //     setDisabledAddWeekButton(false)
  //   }
  // }, [weeks])

  const onSubmit = () => {
    console.log(program)
    // this function will add the program to the user's local storage
    // it will also send it to the backend?
    // once that process is valid, it will return the user to the home page
    dispatch(addProgram(program))
    dispatch(resetProgram())
    navigation.navigate('MyPrograms')
  }

  // useEffect(() => {
  //   return () => {
  //     console.log('inside the return')
  //     dispatch(resetProgram())
  //   }
  // }, [dispatch])

  return (
    <View className="h-full">
      <SafeAreaView className="flex-1">
        {weeks.length > 0 ? (
          <>
            <Button
              onPress={() => onSubmit()}
              style={styles.button}
              mode="contained"
              icon="check-all"
            >
              Submit New Program
            </Button>
            <EditInfoModal
              data={{ ...program }}
              updateAction={(info) => {
                dispatch(
                  programUpdated({
                    title: info.title,
                    description: info.description,
                  })
                )
              }}
              entityType="Program"
              onRemove={() => dispatch(programRemoved({ id: program.id }))}
            />
            <DraggableFlatList
              data={weeks}
              onDragEnd={({ data }) => dispatch(weeksReordered(data))}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              containerStyle={{ flex: 1 }}
              onScrollOffsetChange={handleScrollOffsetChange}
              ref={flatListRef}
            />
          </>
        ) : (
          <Text>No weeks added yet.</Text>
        )}
        <AddWeek />
      </SafeAreaView>
    </View>
  )
}
export { CreateProgramScreen, EditWeekScreen, EditDayScreen }
