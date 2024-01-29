/* 
  This modal will be primarily used to edit the info for weeks, days, exercises.
  The modal will be used to ensure that data is processed correctly
  A user will have to submit the changes (data will be checked) before rerendering changes
*/

import { useState } from 'react'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'

const EditInfoModal = ({ data }) => {
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  const handleSubmit = () => {
    console.log('inside submit rn')
  }

  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TextInput
            label={'Title'}
            value={data.title}
            onChangeText={(newTitle) => setTitle(newTitle)}
          />
          <TextInput
            label={'Description'}
            value={data.description}
            onChangeText={(newDescription) => setDescription(newDescription)}
          />
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Button onPress={handleSubmit}>Submit changes</Button>
        </Modal>
      </Portal>
      <Button onPress={showModal}>Show modal</Button>
    </>
  )
}

export default EditInfoModal
