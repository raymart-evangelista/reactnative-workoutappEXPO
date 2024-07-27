import { useRoute } from '@react-navigation/native'
import { SafeAreaView, View, Text } from 'react-native'
import { useQuery } from '@realm/react'
import { Program } from '../models/Program'

export default function ProgramDetailsScreen() {
  const route = useRoute()
  const { programId } = route.params
  const program = useQuery(Program).filtered('_id == $0', programId)[0]
  console.log(program)

  return (
    <SafeAreaView>
      <Text>ProgramDetails</Text>
      {/* <Text>Title: {program.title}</Text> */}
      {/* <Text>Description: {program.description}</Text> */}
    </SafeAreaView>
  )
}
