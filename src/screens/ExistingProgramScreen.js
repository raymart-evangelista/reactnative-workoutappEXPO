import { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, Modal, TextInput, ScrollView, Dimensions } from "react-native";
import { Text, Button } from "react-native-paper";
import Card from "../components/CardDepricated";

import programsService from "../services/programs";

export function ExistingProgramsScreen({ navigation, screenType = null }) {
  const [programs, setPrograms] = useState([])
  const [deletedProgramId, setDeletedProgramId] = useState(null)
  const [lastModified, setLastModified] = useState(Date.now())


  const windowHeight = Dimensions.get('window').height
  const desiredSpacing = windowHeight * 0.075

  const handleProgramPress = (program) => {
    navigation.navigate('EditProgram', {
      program: program,
      // onProgramDeleted: handleProgramDeleted 
      onProgramModified: handleProgramModified
    })
  }

  useEffect(() => {
    const fetchPrograms = async () => {
      const existingPrograms = await programsService.getPrograms()
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

  return (
    <ScrollView 
      style={{ padding: '2%', paddingTop: desiredSpacing, paddingBottom: desiredSpacing }}
    >
      {programs.length === 0 ? (
        <Text>No programs currently exist</Text>
      ) : (
        programs.map((program) => (
          <View key={program.id}
            className="my-2"
          >
            <TouchableOpacity key={program.id} onPress={() => handleProgramPress(program)}>
              <Card title={program.name} subtitle={program.weeks + ` week training program`} />
            </TouchableOpacity>
          </View>
          //   <Text>{program.name}</Text>
        ))
      )}
    </ScrollView>
  )
}

export function EditProgramScreen({ navigation, route }) {
  // want to send the route to CreateProgramScreen

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

  const editProgram = () => {
    // console.log(`inside editProgram`)
    console.log(program.id) 

    // we want to navigate to ProgramNameInputScreen
    // send in the program as well
    navigation.navigate('CreateProgram', { programId: program.id })
  }

  const continueProgram = () => {
    navigation.navigate('ProgramInformation', { programId: program.id })
  }

  const windowHeight = Dimensions.get('window').height
  const desiredSpacing = windowHeight * 0.075

  return (
    <View
      style={{ padding: '2%', paddingTop: desiredSpacing, paddingBottom: desiredSpacing }}
    >
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
          <Button onPress={() => setModalVisible(false)}>Cancel</Button>
          <Button onPress={handleSaveNameChange}>Save</Button>
        </View>
      </Modal>
      <TouchableOpacity onPress={editProgram}>
        <Text>Edit program details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={continueProgram}>
        <Text>Continue program</Text>
      </TouchableOpacity>
    </View>
  )
}