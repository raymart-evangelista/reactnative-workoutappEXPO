/* 
  This modal will be primarily used to edit the info for weeks, days, exercises.
  The modal will be used to ensure that data is processed correctly
  A user will have to submit the changes (data will be checked) before rerendering changes
*/

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const EditInfoModal = ({ data, updateAction, entityType }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

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
    console.log(info)
    hideModal()

    dispatch(
      updateAction({
        id: data.id,
        title: info.title,
        description: info.description,
      })
    )
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
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
      </Portal>
      <Button onPress={showModal}>Show modal</Button>
    </>
  )
}

export default EditInfoModal
