/* 
  This modal will be primarily used to edit the info exercises when creating a program.
  A user will have to submit the changes (data will be checked) before rerendering changes
*/

import { useState } from 'react'
import { Button, Modal } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const EditExercise = ({ data, updateAction, entityType, onRemove }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const modalContainerStyle = {}

  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false)

  const ConfirmRemoveModal = () => (
    <Modal
      visible={showConfirmRemoveModal}
      onDismiss={() => setShowConfirmRemoveModal(false)}
      contentContainerStyle={modalContainerStyle}
    >
      <Text>
        Are you sure you want to remove this {entityType.toLowerCase()}?
      </Text>
      <Button
        onPress={() => {
          onRemove()
          setShowConfirmRemoveModal(false)
          hideModal()
        }}
      >
        Yes
      </Button>
      <Button onPress={() => setShowConfirmRemoveModal(false)}>No</Button>
    </Modal>
  )
}
