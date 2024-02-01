/* 
  This modal will be primarily used to edit the info for weeks, days, exercises.
  The modal will be used to ensure that data is processed correctly
  A user will have to submit the changes (data will be checked) before rerendering changes
*/

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { RemoveWeek } from '../features/weeks/RemoveWeek'

const EditInfoModal = ({ data, updateAction, entityType, onRemove }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    borderRadius: 15,
  }

  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false)

  const ConfirmRemoveModal = () => (
    <Modal
      visible={showConfirmRemoveModal}
      onDismiss={() => setShowConfirmRemoveModal(false)}
      contentContainerStyle={containerStyle}
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  })

  const onSubmit = (info) => {
    // data that is passed through here means validation was successful
    hideModal()

    updateAction({
      ...data,
      ...info,
    })
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {onRemove && (
            <Button
              icon="trash-can-outline"
              mode="outlined"
              // onPress={() => onRemove(data.id)}
              onPress={() => setShowConfirmRemoveModal(true)}
            >
              Remove
            </Button>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                // placeholder={'defualt placeholder'}
                label={'Title'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="title"
          />
          {errors.title && (
            <Text>A {entityType.toLowerCase()} title is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              maxLength: 200,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                // placeholder={'defualt placeholder'}
                label={'Description'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
          {errors.description && (
            <Text>{entityType} description is too long.</Text>
          )}

          <Button onPress={handleSubmit(onSubmit)}>Submit changes</Button>
        </Modal>
        <ConfirmRemoveModal />
      </Portal>
      <Button mode="contained" icon="pencil-outline" onPress={showModal}>
        Edit
      </Button>
    </>
  )
}

export default EditInfoModal
