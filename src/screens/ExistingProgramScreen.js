import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import programsService from "../services/programs";

export function ExistingProgramsScreen({  }) {
  const [programs, setPrograms] = useState([])

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
        <View key={program._id}>
          <Text key={program._id}>{program._id}</Text>
          <Text>{program.name}</Text>
          <Text>{program.weeks}</Text>
        </View>
      ))}
    </View>
  )
}