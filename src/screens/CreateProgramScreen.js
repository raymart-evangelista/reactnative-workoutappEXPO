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
import { BSON } from 'realm'
import { useRealm } from '@realm/react'
import { Program } from '../models/Program'

const EditWeekScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const weekId = route.params.weekId
  const week = route.params.week

  const days = useSelector((state) => {
    const week = state.program.weeks.find((week) => week.id === weekId)
    return week ? week.days : []
  })

  const flatListRef = useRef(null)

  useEffect(() => {
    if (days && days.length > 0) {
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true })
        }
      }, 100)
    }
  }, [days])

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
        {days && days.length > 0 ? (
          <DraggableFlatList
            dragHitSlop={{ left: -50 }}
            data={days}
            onDragEnd={({ data }) =>
              dispatch(daysReordered({ weekId, newDaysOrder: data }))
            }
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            containerStyle={{ flex: 1 }}
            ref={flatListRef}
          />
        ) : (
          <View>
            <Text>No days added yet.</Text>
          </View>
        )}
      </SafeAreaView>
      <AddDay weekId={weekId} />
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

  const flatListRef = useRef(null)

  useEffect(() => {
    if (exercises && exercises.length > 0) {
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true })
        } else {
        }
      }, 150)
    }
  }, [exercises])

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
        {exercises && exercises.length > 0 ? (
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
            ref={flatListRef}
          />
        ) : (
          <Text>No exercises added yet.</Text>
        )}
      </SafeAreaView>
      <AddExercise weekId={weekId} dayId={dayId} />
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

  const realm = useRealm()

  const parseValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return null
    }
    return parseInt(value, 10)
  }

  const onSubmit = () => {
    console.log(`\t\t -----Submitting-----`)
    console.log(JSON.stringify(program, null, 2))
    // this function will add the program to the user's local storage
    try {
      realm.write(() => {
        realm.create('Program', {
          _id: new BSON.ObjectId(),
          title: program.title,
          description: program.description,
          weeks: program.weeks.map((week) => ({
            _id: new BSON.ObjectId(),
            title: week.title,
            description: week.description,
            days: week.days.map((day) => ({
              _id: new BSON.ObjectId(),
              title: day.title,
              description: day.description,
              exercises: day.exercises.map((exercise) => ({
                _id: new BSON.ObjectId(),
                name: exercise.name,
                warmup: {
                  sets: {
                    single: parseValue(exercise.warmup.sets.single),
                    min: parseValue(exercise.warmup.sets.min),
                    max: parseValue(exercise.warmup.sets.max),
                    useRange: exercise.warmup.sets.useRange,
                    weight: 0.0,
                  },
                  reps: {
                    single: parseValue(exercise.warmup.reps.single),
                    min: parseValue(exercise.warmup.reps.min),
                    max: parseValue(exercise.warmup.reps.max),
                    useRange: exercise.warmup.reps.useRange,
                  },
                  rpe: {
                    single: parseValue(exercise.warmup.rpe.single),
                    min: parseValue(exercise.warmup.rpe.min),
                    max: parseValue(exercise.warmup.rpe.max),
                    useRange: exercise.warmup.rpe.useRange,
                  },
                },
                working: {
                  sets: {
                    single: parseValue(exercise.working.sets.single),
                    min: parseValue(exercise.working.sets.min),
                    max: parseValue(exercise.working.sets.max),
                    useRange: exercise.working.sets.useRange,
                    weight: 0.0,
                  },
                  reps: {
                    single: parseValue(exercise.working.reps.single),
                    min: parseValue(exercise.working.reps.min),
                    max: parseValue(exercise.working.reps.max),
                    useRange: exercise.working.reps.useRange,
                  },
                  rpe: {
                    single: parseValue(exercise.working.rpe.single),
                    min: parseValue(exercise.working.rpe.min),
                    max: parseValue(exercise.working.rpe.max),
                    useRange: exercise.working.rpe.useRange,
                  },
                },
              })),
            })),
          })),
        })
      })

      console.log('program added onSubmit')
    } catch (error) {
      console.log(error.stack)
    }
    // it will also send it to the backend?
    // once that process is valid, it will return the user to the home page

    dispatch(addProgram(program))
    dispatch(resetProgram())
    navigation.navigate('MyPrograms')
  }

  const flatListRef = useRef(null)

  useEffect(() => {
    if (weeks.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [weeks])

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
      </SafeAreaView>
      <AddWeek />
    </View>
  )
}
export { CreateProgramScreen, EditWeekScreen, EditDayScreen }
