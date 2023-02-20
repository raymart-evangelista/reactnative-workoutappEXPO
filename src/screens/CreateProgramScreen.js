import { useState } from "react"
import { Button, Text, TextInput, TouchableHighlight, View } from "react-native"

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

  return (
    <View>
      <Text>How many weeks will {programName} run?</Text>
      <TextInput 
        placeholder="# of weeks"
        keyboardType="numeric"
        value={weeks.toString()}
        onChangeText={(weeks) => setWeeks(parseInt(weeks))}
      />
      <Button 
        title="Next"
        onPress={() => navigation.navigate('WeeksSelectable', { programName, weeks })}
        disabled={!programName}
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
        <TouchableHighlight key={weekNum} onPress={() => handleWeekPress(weekNum)}>
          <Text>Week {weekNum}</Text>
        </TouchableHighlight>
      ))}

    </View>
  )
}

export function WeekDetailsScreen({ route }) {
  const { programName, weekNum } = route.params

  return (
    <View>
      <Text>You are adding information for Week {weekNum} of {programName}</Text>
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