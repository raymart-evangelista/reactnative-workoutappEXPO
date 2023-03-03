import { useEffect, useState } from "react"
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Formik } from "formik";

import programsService from "../services/programs";

export function ProgramNameInputScreen({ navigation }) {
  const [programName, setProgramName] = useState('')

  const handleSaveProgram = async () => {

    // TODO: backend portion
    // const newProgram = await programsService.createProgram({
    //   name: programName
    // })
    // navigation.reset({
    //   index: 0,
    //   routes: [{
    //     name: 'AddWeeks',
    //     params: { newProgram }
    //   }]
    // })
  }

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: ''}}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
           ) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}            
            />
            {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
            <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
              <Text style={{ backgroundColor: isSubmitting ? '#ccc' : '#007AFF', color: '#fff', padding: 10, textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Text>What is the name of your workout program?</Text>
      <TextInput 
        placeholder="Workout program name"
        value={programName}
        onChangeText={(text) => setProgramName(text)}
      />
      <Button 
        title="Add Week"
        onPress={() => navigation.navigate('AddWeeks')}
      />
      <Button 
        title="Save"
        onPress={() => handleSaveProgram()}
        disabled={!programName}
      />
    </View>
  )
}

export function AddWeeksScreen({ navigation, route }) {
  const { newProgram } = route.params
  const [weeks, setWeeks] = useState([])
  const [program, setProgram] = useState(null)

  const handleNewWeek = () => {
    const newWeek = { weekNum: weeks.length + 1, dayDetails: [] }
    setWeeks([...weeks, newWeek])
  }

  const handleUpdateProgram = async () => {
    const updatedProgram = await programsService.updateProgram(newProgram._id, { weeks: weeks.length, weekDetails: weeks })
    console.log('/// inside AddWeeksScreen/handleUpdateProgram ///')
    console.log(updatedProgram)
    console.log('/// inside AddWeeksScreen/handleUpdateProgram ///')
    setProgram(updatedProgram)
  }

  const handleWeekPress = (week) => {
    navigation.navigate('AddDays', { program, week, handleDaysUpdate })
  }

  const handleDaysUpdate = (updatedDays, weekNum) => {

    const updatedWeeks = weeks.map((week) => {
      if (week.weekNum === weekNum) {
        return { ...week, dayDetails: updatedDays }
      }
      return week
    })
    console.log('---- \t \t updated weeks')
    console.log(updatedWeeks)

    // weeks[weekNum - 1].dayDetails = updatedDays

    // updatedWeeks[weekNum - 1].dayDetails = updatedDays
    // const updatedWeeks = weeks.map((week) => {
    //   if (week.weekNum === weekNum) {
    //     return { ...week, dayDetails: updatedDays}
    //   }
    //   return week
    // })
    setWeeks(updatedWeeks)
  }

  useEffect(() => {
    console.log('---- weeks ----')
    console.log(weeks[0])
    console.log('---- weeks ----')
    if (program) {
      handleUpdateProgram()
    }
  }, [weeks])

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
  const { program, week, handleDaysUpdate } = route.params
  const [days, setDays] = useState([])

  
  const handleNewDay = () => {
    if (days.length >= 7) {
      return
    }
    const newDay = { dayNum: days.length + 1, exercises: [] }
    setDays([...days, newDay])
  }
  
  
  
  useEffect(() => {
    console.log('---- days ----')
    console.log(days)
    console.log('---- days ----')
    // handleUpdateProgram function should be called after handleDaysUpdate to ensure that weeks is updated before updatedProgram is updated in the database
    handleDaysUpdate(days, week.weekNum)
  }, [days])

  const handleUpdateProgram = async () => {
    // TODO: update dayDetails for the certain week
    try {
      const updatedProgram = { ...program }
      const weekIndex = week.weekNum - 1
      console.log(`**** **** week index ${weekIndex}`)

      console.log("---- updatedProgram ------")
      console.log(updatedProgram)
      console.log("------ \t before ------")
      console.log(updatedProgram.weekDetails[weekIndex].dayDetails)
      updatedProgram.weekDetails[weekIndex].dayDetails = days
      console.log("------ \t after ------")
      console.log(updatedProgram.weekDetails[weekIndex].dayDetails)
      console.log("---- updatedProgram ------")
      await programsService.updateProgram(program._id, updatedProgram)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDayPress = (day) => {
    navigation.navigate('DayDetails', { day })
  }

  const handleSavePress = () => {
    handleUpdateProgram()
  }

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
      <Button 
        title='Save'
        onPress={handleSavePress}
      />
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