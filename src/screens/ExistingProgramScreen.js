import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import programsService from "../services/programs";

export function ExistingProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState([])

  const handleProgramPress = (program) => {
    console.log(program)
    // navigate to new screen to edit program
    navigation.navigate('EditProgram', { program })
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      const existingPrograms = await programsService.getExistingPrograms()
      setPrograms(existingPrograms)
    }

    fetchPrograms()
  }, [])

  console.log(programs)
  return (
    <View>
      {programs.map((program) => (
        <TouchableOpacity key={program._id} onPress={() => handleProgramPress(program)}>
          <Text>{program.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export function EditProgramScreen({ navigation }) {

  const deleteProgramPress = () => {

  }
  return (
    <View>
      {/* <TouchableOpacity onPress={() => deleteProgramPress()}>
        Delete program
      </TouchableOpacity> */}
    </View>
  )
}