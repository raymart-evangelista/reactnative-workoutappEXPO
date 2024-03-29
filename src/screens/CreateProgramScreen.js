import { useEffect, useState, useRef } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native'
import {
  Button,
  Text,
  Title,
  RadioButton,
  List,
  useTheme,
} from 'react-native-paper'
import * as Yup from 'yup'
import { FlatList } from 'react-native'

// import TextInput from "../components/TextInput";

import { TextInput } from 'react-native-paper'
import SegmentedButtonWithSelectedCheck from '../components/SegmentedButtonWithSelectedCheck'

import programsService from '../services/programs'

import { useFieldArray, useWatch, useForm, Controller } from 'react-hook-form'

import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  Easing,
  FadeIn,
  useDerivedValue,
} from 'react-native-reanimated'
import { Circle, Svg } from 'react-native-svg'
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler'

import uuid from 'react-native-uuid'
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
} from 'react-native-draggable-flatlist'

import CollapsibleCard from '../components/CollapsibleCard'
import { AnimatedFAB as AniFAB } from 'react-native-paper'
import { WeekCard, DayCard, ExerciseCard } from '../components/Card'

import { useDispatch, useSelector } from 'react-redux'
import { AddWeek } from '../features/weeks/AddWeek'
import { AddDay } from '../features/weeks/days/AddDay'
import { AddExercise } from '../features/weeks/days/exercises/AddExercise'
import {
  daysReordered,
  exercisesReordered,
  weeksReordered,
} from '../features/weeksSlice'

const AnimatedBoxHeightValue = 50
const AnimatedDayBoxClosedWidthValue = '100%'
const AnimatedDayBoxClosedHeightValue = 80
const AnimatedDayBoxOpenHeightValue = 200

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
  const [disableAddWeekButton, setDisabledAddWeekButton] = useState(false)

  // const { control, handleSubmit, formState: { errors } } = useForm({
  //     defaultValues: {
  //         programName: "",
  //         weeks: []
  //     }
  // })

  const onSubmit = (weeks) => console.log(weeks)

  // const { fields: weekFields, append: appendWeek } = useFieldArray({
  //     control,
  //     name: "weeks"
  // })

  // Function to append a week and initialize its animation
  // const handleAddWeek = () => {
  //     appendWeek({ days: [] })
  //     appendWeek({ days: [] })
  //     const newWeekAnimation = useSharedValue(0)
  //     newWeekAnimation.value = withTiming(1, { duration: 500 })
  //     weekAnimations.push(newWeekAnimation)
  // }

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
    // <SafeAreaView>
    //     <Controller
    //         control={control}
    //         rules={{ required: true }}
    //         render={({ field: { onChange, onBlur, value } }) => (
    //             <TextInput
    //                 placeholder="Program Name"
    //                 onBlur={onBlur}
    //                 onChangeText={onChange}
    //                 value={value}
    //             />
    //         )}
    //         name="programName"
    //     />
    //     {errors.programName && <Text>Program name is needed.</Text>}
    //     {/* button to add weeks */}
    //     <Button onPress={handleAddWeek}>Add Week</Button>
    //     {weekFields.map((week, weekIndex) => (
    //         <TouchableOpacity key={week.id} onPress={() => {/* navigate to day screen */}}>
    //         <Text>Week {weekIndex + 1}</Text>
    //         </TouchableOpacity>
    //         ))}
    // </SafeAreaView>
    <View className="h-full">
      <SafeAreaView className="flex-1">
        <Button onPress={() => console.log(weeks)}>Submit</Button>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 50,
  },
  svg: {
    height: 250,
    width: '100%',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
  weekBox: {
    height: AnimatedBoxHeightValue,
    width: '90%',
    // alignSelf: 'center',
    // flexDirection: 'row',

    alignItems: 'center',
    // justifyContent: 'left',
    // backgroundColor: '#e0e0e0',
    // backgroundColor: 'lightwhite',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: '5%',
    // paddingVertical: 15,
    overflow: 'hidden',
  },
  gestureTapArea: {
    width: '100%',
    height: 50, // Fixed height for the tap area
    borderRadius: 10,
    // marginVertical: -1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dayBox: {
    width: AnimatedDayBoxClosedWidthValue,
    height: AnimatedDayBoxClosedHeightValue,
    backgroundColor: 'beige',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    margin: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expandedContent: {},
})

export { CreateProgramScreen, EditWeekScreen, EditDayScreen }
