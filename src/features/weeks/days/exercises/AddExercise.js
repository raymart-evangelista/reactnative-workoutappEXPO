import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  AnimatedFAB,
  Button,
  Portal,
  Modal,
  TextInput,
  Text,
  Switch,
} from 'react-native-paper'
import { exerciseAdded } from '../../../weeksSlice'
import { nanoid } from '@reduxjs/toolkit'
import { StyleSheet, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

export const AddExercise = ({ weekId, dayId }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [isRange, setIsRange] = useState(false)
  const [useRangeForWarmupSets, setUseRangeForWarmupSets] = useState(false)
  const [useRangeForWorkingSets, setUseRangeForWorkingSets] = useState(false)
  const [useRangeForReps, setUseRangeForReps] = useState(false)
  const [useRangeForRPE, setUseRangeForRPE] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      warmupSets: { min: '', max: '' },
      workingSets: { min: '', max: '' },
      reps: { min: '', max: '' },
      RPE: { min: '', max: '' },
    },
  })

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
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                label="Exercise Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                error={!!error}
              />
            )}
          />
          {errors.name && <Text>Exercise name is required.</Text>}
          {/* form stuff in here */}
          <View style={styles.switchContainer}>
            <Text>Use range for warmup sets?</Text>
            <Switch
              value={useRangeForWarmupSets}
              onValueChange={setUseRangeForWarmupSets}
            />
          </View>

          {useRangeForWarmupSets ? (
            <>
              <Controller
                control={control}
                name="warmupSets.min"
                rules={{ required: true, min: 0, max: 9 }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    label="Warmup sets (minimum)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    error={!!error}
                  />
                )}
              />
              {errors.name && <Text>Minimum warmup sets required.</Text>}
              <Controller
                control={control}
                name="warmupSets.max"
                rules={{ required: true, min: 1, max: 10 }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    label="Warmup sets (maximum)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    error={!!error}
                  />
                )}
              />
              {errors.name && <Text>Maximum warmup sets required.</Text>}
            </>
          ) : (
            <>
              <Controller
                control={control}
                name="warmupSets.value"
                rules={{ required: true, min: 0, max: 9 }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    label="Warmup sets (minimum)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    error={!!error}
                  />
                )}
              />
              {errors.name && <Text>Minimum warmup sets required.</Text>}
            </>
          )}

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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
})
