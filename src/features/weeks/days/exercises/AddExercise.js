import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  AnimatedFAB,
  Button,
  Portal,
  Modal,
  TextInput,
  Text,
} from 'react-native-paper'
import { exerciseAdded } from '../../../weeksSlice'
import { nanoid } from '@reduxjs/toolkit'
import { StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

export const AddExercise = ({ weekId, dayId }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState()
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  // /**
  //  * When a user is adding a new exercise, before dispatching, they must input the exercise info
  //  * into the form, then after submitting, the input will be checked and then if everything
  //  * is valid, it will be submitted
  //  */
  const onAddExerciseClicked = () => {
    showModal()
  }

  const onSubmit = (data) => {
    dispatch(
      exerciseAdded({
        weekId,
        dayId,
        exercise: {
          id: nanoid(),
          name: data.name,
          warmupSets: data.warmupSets,
          workingSets: data.workingSets,
          reps: data.reps,
          RPE: data.RPE,
        },
      })
    )
    hideModal()
  }

  const onValidSubmission = () => {
    dispatch(
      exerciseAdded({
        weekId,
        dayId,
        exercise: {
          // data here
        },
      })
    )
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Exercise Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
          {errors.name && <Text>Exercise name is required.</Text>}
          {/* form stuff in here */}
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Modal>
      </Portal>
      <AnimatedFAB
        icon="plus"
        label="Add Exercise"
        onPress={onAddExerciseClicked}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fabStyle]}
        extended="true"
      />
    </>
  )
}

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    borderRadius: 15,
  },
  input: {
    marginBottom: 10,
  },
})
