import { useEffect, useState } from "react"
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from "react-native"

import programsService from "../services/programs";

export function ProgramNameInputScreen({ navigation }) {
  const [programName, setProgramName] = useState('')
  const [numWeeks, setNumWeeks] = useState('')

  const handleCreateProgram = () => {

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
        onPress={() => navigation.navigate('Weeks', { programName })}
        disabled={!programName}
      />
      {/* <Text>Number of weeks: </Text>
      <TextInput 
        keyboardType="numeric"
        value={numWeeks.toString()}
        onChangeText={value => setNumWeeks(parseInt(value))}
      />
      <Button 
        title="Create program"
        onPress={handleCreateProgram}
      /> */}
    </View>
  )
}

export function WeeksInputScreen({ navigation, route }) {
  const { programName } = route.params
  const [weeks, setWeeks] = useState('')


  const handleNewProgram = async () => {
    // console.log(`inside handleNewProgram`)
    const newProgram = await programsService.createProgram({
      name: programName,
      weeks: weeks
    })
    navigation.reset({
      index: 0,
      routes: [{
        name: 'WeeksSelectable',
        params: { programName, weeks }
      }]
    })
    // console.log(`newProgram: ${newProgram}`)
  }

  return (
    <View>
      <Text>How many weeks will {programName} run?</Text>
      <TextInput 
        placeholder="# of weeks"
        keyboardType="numeric"
        value={weeks.toString()}
        onChangeText={(weeks) => setWeeks(parseInt(weeks))}
      />
      {/* Next will handleNewProgram */}
      <Button 
        title="Next"
        onPress={handleNewProgram}
        // onPress={() => navigation.reset({
        //   index: 0,
        //   routes: [{
        //     name: 'WeeksSelectable',
        //     params: { programName, weeks }
        //   }]
        // })}
        disabled={!weeks}
      />

    </View>
  )
}

export function WeeksSelectableScreen({ navigation, route }) {
  const { programName, weeks } = route.params

  const handleWeekPress = (weekNum) => {
    navigation.navigate('WeekDetails', { programName, weekNum })
  }

  return (
    <View>
      <Text>Select a week to add information to.</Text>
      {Array.from({ length: weeks}, (_, index) => index + 1).map((weekNum) => (
        <TouchableOpacity key={weekNum} onPress={() => handleWeekPress(weekNum)}>
          <Text>Week {weekNum}</Text>
        </TouchableOpacity>
      ))}

    </View>
  )
}

export function WeekDetailsScreen({ navigation, route }) {
  const { programName, weekNum } = route.params

  const handleDayPress = (dayNum) => {
    navigation.navigate('DayDetails', { weekNum, dayNum })
  }

  return (
    <View>
      <Text>You are adding information for Week {weekNum} of {programName}</Text>
      <TouchableOpacity onPress={() => handleDayPress(1)}>
        <Text>Day 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDayPress(2)}>
        <Text>Day 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDayPress(3)}>
        <Text>Day 3</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDayPress(4)}>
        <Text>Day 4</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDayPress(5)}>
        <Text>Day 5</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDayPress(6)}>
        <Text>Day 6</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDayPress(7)}>
        <Text>Day 7</Text>
      </TouchableOpacity>
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