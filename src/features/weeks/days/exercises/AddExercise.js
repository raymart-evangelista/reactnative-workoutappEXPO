import { useEffect, useState } from 'react'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const AddExercise = ({ weekId, dayId }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [useRangeForWarmupSets, setUseRangeForWarmupSets] = useState(false)
  const [useRangeForWorkingSets, setUseRangeForWorkingSets] = useState(false)
  const [useRangeForReps, setUseRangeForReps] = useState(false)
  const [useRangeForRPE, setUseRangeForRPE] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      warmup: {
        sets: {
          amount: {
            single: '',
            range: {
              min: '',
              max: '',
            },
          },
          useRange: false,
        },
        reps: {
          amount: {
            single: '',
            range: {
              min: '',
              max: '',
            },
          },
          useRange: false,
        },
        rpe: {
          amount: {
            single: '',
            range: {
              min: '',
              max: '',
            },
          },
          useRange: false,
        },
      },
      working: {
        sets: {
          amount: {
            single: '',
            range: {
              min: '',
              max: '',
            },
          },
          useRange: false,
        },
        reps: {
          amount: {
            single: '',
            range: {
              min: '',
              max: '',
            },
          },
          useRange: false,
        },
        rpe: {
          amount: {
            single: '',
            range: {
              min: '',
              max: '',
            },
          },
          useRange: false,
        },
      },
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
    console.log(data)

    const warmupSetsPayload = useRangeForWarmupSets
      ? {
          isRange: true,
          min: data.warmupSets.min,
          max: data.warmupSets.max,
        }
      : {
          isRange: false,
          value: data.warmupSets.value,
        }
    const workingSetsPayload = useRangeForWorkingSets
      ? {
          isRange: true,
          min: data.workingSets.min,
          max: data.workingSets.max,
        }
      : {
          isRange: false,
          value: data.workingSets.value,
        }
    const repsPayload = useRangeForReps
      ? {
          isRange: true,
          min: data.reps.min,
          max: data.reps.max,
        }
      : {
          isRange: false,
          value: data.reps.value,
        }
    const rpePayload = useRangeForRPE
      ? {
          isRange: true,
          min: data.rpe.min,
          max: data.rpe.max,
        }
      : {
          isRange: false,
          value: data.rpe.value,
        }
    dispatch(
      exerciseAdded({
        weekId,
        dayId,
        exercise: {
          id: nanoid(),
          name: data.name,
          warmupSets: warmupSetsPayload,
          workingSets: workingSetsPayload,
          reps: repsPayload,
          RPE: rpePayload,
        },
      })
    )
    hideModal()
    setUseRangeForWarmupSets(false)
    setUseRangeForWorkingSets(false)
    setUseRangeForReps(false)
    setUseRangeForRPE(false)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        warmupSets: {
          value: '',
          min: '',
          max: '',
          isRange: false,
        },
        workingSets: {
          value: '',
          min: '',
          max: '',
          isRange: false,
        },
        reps: {
          value: '',
          min: '',
          max: '',
          isRange: false,
        },
        rpe: {
          value: '',
          min: '',
          max: '',
          isRange: false,
        },
      })
    }
  }, [formState, reset])

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <KeyboardAwareScrollView>
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
                  value={value || ''}
                  style={styles.input}
                  error={!!error}
                />
              )}
            />
            {errors.name && <Text>Exercise name is required.</Text>}

            {/* 
          warmup sets
          */}

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
                      value={value || ''}
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
                      value={value || ''}
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
                      label="Warmup sets"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Warmup set amount is required.</Text>}
              </>
            )}

            {/* 
          working sets
          */}

            <View style={styles.switchContainer}>
              <Text>Use range for working sets?</Text>
              <Switch
                value={useRangeForWorkingSets}
                onValueChange={setUseRangeForWorkingSets}
              />
            </View>

            {useRangeForWorkingSets ? (
              <>
                <Controller
                  control={control}
                  name="workingSets.min"
                  rules={{ required: true, min: 0, max: 9 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="Working sets (minimum)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Minimum working sets required.</Text>}
                <Controller
                  control={control}
                  name="workingSets.max"
                  rules={{ required: true, min: 1, max: 10 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="Working sets (maximum)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Maximum working sets required.</Text>}
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="workingSets.value"
                  rules={{ required: true, min: 0, max: 9 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="Working sets"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Working set amount is required.</Text>}
              </>
            )}

            {/* 
            reps for working sets
          */}

            <View style={styles.switchContainer}>
              <Text>Use range for reps?</Text>
              <Switch
                value={useRangeForReps}
                onValueChange={setUseRangeForReps}
              />
            </View>

            {useRangeForReps ? (
              <>
                <Controller
                  control={control}
                  name="reps.min"
                  rules={{ required: true, min: 1 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="Reps (minimum)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Value for reps (min) is required.</Text>}
                <Controller
                  control={control}
                  name="reps.max"
                  rules={{ required: true, min: 2 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="Reps (maximum)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Value for reps (max) is required.</Text>}
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="reps.value"
                  rules={{ required: true, min: 1 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="Reps"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Value for reps is required.</Text>}
              </>
            )}

            {/* 
            RPE for working sets
          */}

            <View style={styles.switchContainer}>
              <Text>Use range for RPE?</Text>
              <Switch
                value={useRangeForRPE}
                onValueChange={setUseRangeForRPE}
              />
            </View>

            {useRangeForRPE ? (
              <>
                <Controller
                  control={control}
                  name="rpe.min"
                  rules={{ required: true, min: 1 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="RPE (minimum)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Value for RPE (min) is required.</Text>}
                <Controller
                  control={control}
                  name="rpe.max"
                  rules={{ required: true, min: 2 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="RPE (maximum)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Value for RPE (max) is required.</Text>}
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  name="rpe.value"
                  rules={{ required: true, min: 1 }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <TextInput
                      label="RPE"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ''}
                      style={styles.input}
                      error={!!error}
                    />
                  )}
                />
                {errors.name && <Text>Value for RPE is required.</Text>}
              </>
            )}

            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </KeyboardAwareScrollView>
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
