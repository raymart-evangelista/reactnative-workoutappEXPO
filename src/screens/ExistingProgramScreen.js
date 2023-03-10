import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, Button, TextInput } from "react-native";

import programsService from "../services/programs";

export function ExistingProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState([])
  const [deletedProgramId, setDeletedProgramId] = useState(null)
  const [lastModified, setLastModified] = useState(Date.now())

  const handleProgramPress = (program) => {
    // navigate to new screen to edit program
    navigation.navigate('EditProgram', {
      program: program,
      // onProgramDeleted: handleProgramDeleted 
      onProgramModified: handleProgramModified
    })
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      const existingPrograms = await programsService.getProgram()
      setPrograms(existingPrograms)
    }

    fetchPrograms()
  }, [deletedProgramId, lastModified])
  
  const handleProgramDeleted = (programId) => {
    setDeletedProgramId(programId)
  }

  const handleProgramModified = () => {
    setLastModified(Date.now())
  }

  console.log(programs)
  return (
    <View>
      {programs.length === 0 ? (
        <Text>No programs currently exist</Text>
      ) : (
        programs.map((program) => (
          <TouchableOpacity key={program.id} onPress={() => handleProgramPress(program)}>
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
  // const onProgramDeleted = route.params.onProgramDeleted
  const onProgramModified = route.params.onProgramModified
  
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
              // onProgramDeleted(program.id)
              onProgramModified()
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
    await programsService.updateProgram(program.id, { name: newProgramName })
    setModalVisible(false)
    navigation.goBack()
    onProgramModified()
    try {
    } catch (error) {
      console.error(error)
    } finally {
    }
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