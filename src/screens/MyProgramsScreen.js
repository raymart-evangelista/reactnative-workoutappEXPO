import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { useQuery } from '@realm/react'
import { Program } from '../models/Program'
import { useThemedStyles } from '../styles/globalStyles'
import { ProgramCard } from '../components/Card'

export default function MyProgramsScreen({ navigation }) {
  const styles = useThemedStyles()
  return (
    <View>
      <Text>This screen shows your programs</Text>
      <ProgramList />
    </View>
  )
}

const ProgramList = () => {
  const programs = useSelector((state) => state.programs.programs)
  const realmPrograms = useQuery(Program)
  console.log(realmPrograms)

  const handleProgramCardPress = () => {
    console.log('testing the handling of programcard press')
  }

  const renderRealm = ({ item }) => (
    <ProgramCard program={item} onClick={handleProgramCardPress} />
  )

  return (
    <>
      <FlatList
        data={realmPrograms}
        renderItem={renderRealm}
        keyExtractor={(item) => item._id}
      />
    </>
  )
}
