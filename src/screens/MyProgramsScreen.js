import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { useQuery, useRealm } from '@realm/react'
import { Program } from '../models/Program'
import { useThemedStyles } from '../styles/globalStyles'
import { ProgramCard } from '../components/Card'
import { useNavigation } from '@react-navigation/native'

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
  const styles = useThemedStyles()
  const realm = useRealm()
  const programs = useSelector((state) => state.programs.programs)
  const realmPrograms = useQuery('Program')
  console.log('these are the programs')
  console.log(realmPrograms)

  const navigation = useNavigation()

  const handleProgramCardPress = (program) => {
    console.log(program._id)
    navigation.navigate('ProgramDetails', { programId: program._id })
  }

  const renderRealm = ({ item }) => (
    <ProgramCard program={item} onClick={() => handleProgramCardPress(item)} />
  )

  const deleteAllPrograms = () => {
    console.log('inside')
    realm.write(() => {
      const allPrograms = realm.objects('Program')
      realm.delete(allPrograms)
    })
    console.log('All Programs have been deleted from Realm DB')
  }

  return (
    <>
      <Button
        style={[styles.button]}
        mode="outlined"
        onPress={deleteAllPrograms}
      >
        Delete programs
      </Button>
      <FlatList
        data={realmPrograms}
        renderItem={renderRealm}
        keyExtractor={(item) => item._id}
      />
    </>
  )
}
