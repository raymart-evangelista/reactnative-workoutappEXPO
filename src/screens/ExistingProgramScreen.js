import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, Button, TextInput } from "react-native";

import programsService from "../services/programs";

export function ExistingProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState([])

  const handleProgramPress = (program) => {
    // navigate to new screen to edit program
    navigation.navigate('EditProgram', { program: program })
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      const existingPrograms = await programsService.getProgram()
      setPrograms(existingPrograms)
    }

    fetchPrograms()
  }, [programs])

  console.log(programs)
  return (
    <View>
      {programs.length === 0 ? (
        <Text>No programs currently exist</Text>
      ) : (
        programs.map((program) => (
          <TouchableOpacity key={program._id} onPress={() => handleProgramPress(program)}>
            <Text>{program.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  )
}

export function EditProgramScreen({ navigation, route }) {

  const program = route.params.program
  const [modalVisible, setModalVisible] = useState(false)
  const [newProgramName, setNewProgramName] = useState(program.name)
  
  const deleteProgramPress = () => {
    Alert.alert(
      'Confirm Deletion',
      'Do you really want to delete this program?',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              console.log("****___****")
              console.log(program.id)
              await programsService.deleteProgram(program.id)
              navigation.goBack()
            } catch (error) {
              console.log(error)
            }
          }
        }
      ],
      { cancelable: false }
    )
  }

  const handleSaveNameChange = async () => {
    // TODO: Update program name in the database and navigate back
    console.log(`New program name: ${newProgramName}`)
    try {
    } catch (error) {
      
    }
    setModalVisible(false)
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Edit name</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteProgramPress}>
        <Text>Delete program</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Editing Program Name</Text>
          <TextInput value={newProgramName} onChangeText={setNewProgramName} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
          <Button title="Save" onPress={handleSaveNameChange} />

        </View>
      </Modal>
    </View>
  )
}