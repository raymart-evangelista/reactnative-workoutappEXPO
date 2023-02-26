import { useEffect, useState } from "react"
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from "react-native"

import programsService from "../services/programs";

export function ProgramNameInputScreen({ navigation }) {
  const [programName, setProgramName] = useState('')

  const handleCreateProgram = async () => {

    // TODO: backend portion
    const newProgram = await programsService.createProgram({
      name: programName
    })
    console.log(`The new program id is: ${newProgram._id}`)
    navigation.reset({
      index: 0,
      routes: [{
        name: 'AddWeeks',
        params: { newProgram }
      }]
    })
  }

  return (
    <View>
      <Text>What is the name of your workout program?</Text>
      <TextInput 
        placeholder="Workout program name"
        value={programName}
        onChangeText={(text) => setProgramName(text)}
      />
      <Button 
        title="Next"
        onPress={() => handleCreateProgram()}
        disabled={!programName}
      />
    </View>
  )
}

export function AddWeeksScreen({ navigation, route }) {
  const { newProgram } = route.params
  const [weeks, setWeeks] = useState([])
  const [updatedWeek, setUpdatedWeek] = useState(null)

  const handleNewWeek = () => {
    const newWeek = { weekNum: weeks.length + 1, dayDetails: [] }
    setWeeks([...weeks, newWeek])
  }

  const handleUpdateProgram = async () => {
    const updatedProgram = await programsService.updateProgram(newProgram._id, { weeks: weeks.length, weekDetails: weeks })
  }

  const handleWeekPress = (week) => {
    // pass in setWeeks as props such that the weeks state isn't lost
    navigation.navigate('AddDays', { newProgram, week, onUpdateWeek: setUpdatedWeek })
  }

  useEffect(() => {
    handleUpdateProgram()
  }, [weeks])

  useEffect(() => {
    if (updatedWeek) {
      const updatedWeeks = weeks.map(w => w.weekNum === updatedWeek.weekNum ? updatedWeek : w)
      setWeeks(updatedWeeks)
      setUpdatedWeek(null)
    }
  }, [updatedWeek])

  return (
    <View>
      <Button 
        title={`Add new week to ${newProgram.name}`}
        onPress={handleNewWeek}
      />
      {weeks.map((week) => (
        <TouchableOpacity key={week.weekNum} onPress={() => handleWeekPress(week)}>
          <Text>Week {week.weekNum}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export function AddDaysScreen({ navigation, route }) {
  const { newProgram, week, onUpdateWeek } = route.params
  const [days, setDays] = useState(week.dayDetails)

  const handleNewDay = () => {
    if (days.length >= 7) {
      return
    }
    const newDay = { dayNum: days.length + 1, exercises: [] }
    setDays([...days, newDay])
  }

  // const handleUpdateProgram = async () => {
  //   // TODO: update dayDetails for the certain week
  //   const updatedWeeks = weeks.map((w) => {
  //     if (w.weekNum === week.weekNum) {
  //       return { ...w, dayDetails: days }
  //     } else {
  //       return w
  //     }
  //   })
  //   setWeeks(updatedWeeks)
  //   // const updatedProgram = await programsService.updateProgram(newProgram._id, { weeks: updatedWeeks.length, weekDetails: updatedWeeks })
  // }

  const handleUpdateWeek = async () => {
    const updatedWeek = { ...week, dayDetails: days }
    await programsService.updateWeekInProgram(newProgram._id, updatedWeek)
    onUpdateWeek(updatedWeek)
  }

  const handleDayPress = (day) => {
    navigation.navigate('DayDetails', { day })
  }

  useEffect(() => {
    handleUpdateWeek()
  }, [days])

  return (
    <View>
      <Button 
        // title={`Add new day for week ${week.weekNum} of ${newProgram.name}`}
        title={`Add new day`}
        onPress={() => handleNewDay()}
      />
      {days.map((day) => (
        <TouchableOpacity key={day.dayNum} onPress={() => handleDayPress(day)}>
          <Text>Day {day.dayNum}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export function WeeksSelectableScreen({ navigation, route }) {
  const { programName, weeks } = route.params

  const handleWeekPress = (weekNum) => {
    navigation.navigate('WeekDetails', { programName, weekNum })
  }

  const handleFinishLater = () => {
    navigation.reset({
      index: 0,
      routes: [{
        name: 'Home'
      }]
    })
  }

  return (
    <View>
      <Text>Select a week to add information to.</Text>
      {Array.from({ length: weeks}, (_, index) => index + 1).map((weekNum) => (
        <TouchableOpacity key={weekNum} onPress={() => handleWeekPress(weekNum)}>
          <Text>Week {weekNum}</Text>
        </TouchableOpacity>
      ))}
      <Button 
        title="Finish Later"
        onPress={handleFinishLater}
      />
    </View>
  )
}

export function DayDetailsScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false)

  const [exercises, setExercises] = useState([])

  const [exerciseName, setExerciseName] = useState('')
  const [workingSets, setWorkingSets] = useState('')
  const [reps, setReps] = useState('')

  const { weekNum, dayNum } = route.params

  const handleAddExercise = () => {
    if (exerciseName && workingSets && reps) {
      setExercises(
        [
          ...exercises,
          {
            name: exerciseName,
            sets: workingSets,
            reps: reps,
          }
        ]
      )
      setExerciseName('')
      setWorkingSets('')
      setReps('')
    }

    console.log('Add exercise', exerciseName, workingSets, reps)
    setModalVisible(false)
  }

  return (
    <View>
      <Text>Week {weekNum}, Day {dayNum} Details</Text>
      {exercises.map((exercise, index) => (
        <View key={index}>
          <Text>{exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Reps: {exercise.reps}</Text>
        </View>
      ))}
      <Button title="Add Exercise" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="fade">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Add exercise</Text>
          <TextInput 
            placeholder="Exercise name"
            value={exerciseName}
            onChangeText={setExerciseName}
          />
          <TextInput 
            placeholder="Working sets"
            value={workingSets}
            onChangeText={setWorkingSets}
          />
          <TextInput
            placeholder="Reps"
            value={reps}
            onChangeText={setReps}
          />
          <Button 
            title="Add"
            onPress={handleAddExercise}
          />
          <Button 
            title="Cancel"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  )
}

export function ProgramDetailsScreen({ route }) {
  const { programName, weeks } = route.params

  return (
    <View>
      <Text>Workout Program Details:</Text>
      <Text>Workout Program Name: {programName}</Text>
      <Text>Duration: {weeks} Weeks</Text>
    </View>
  )
}