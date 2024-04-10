import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

export default function MyProgramsScreen({ navigation }) {
  return (
    <View>
      <Text>This screen shows your programs</Text>
      <ProgramList />
    </View>
  )
}

const ProgramList = () => {
  const programs = useSelector((state) => state.programs.programs)

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  )

  return (
    <FlatList
      data={programs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}
