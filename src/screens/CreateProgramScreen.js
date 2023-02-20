import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"

export default function CreateProgramScreen({ navigation }) {
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

export function WeeksScreen({ navigation, route }) {
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
        title="Finish"
        onPress={() => navigation.navigate('Details', { programName, weeks })}
        disabled={!programName}
      />

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