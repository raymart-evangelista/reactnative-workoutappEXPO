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

const RangeOrSingleInput = ({
  control,
  useRange,
  setUseRange,
  rangeMinName,
  rangeMaxName,
  singleName,
  label,
}) => {
  return (
    <View style={styles.exerciseDataContainer2}>
      <Text className="text-lg">{label}</Text>
      <View style={styles.exerciseDataContainer3}>
        <View style={styles.exerciseNumberInputContainer}>
          {useRange ? (
            <View style={styles.exerciseDataContainer5}>
              <Controller
                control={control}
                name={rangeMinName}
                rules={{
                  required: 'This field is required',
                  min: { value: 0, message: 'Minimum value is 0' },
                  max: { value: 9, message: 'Maximum value is 9' },
                  pattern: {
                    value: /^[0-9]$/,
                    message: 'Please enter a number between 0 and 9',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    label="min"
                    style={styles.rangedTextInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                    error={!!error}
                    keyboardType="numeric"
                    mode={'outlined'}
                  />
                )}
              />
              <Text>-</Text>
              <Controller
                control={control}
                name={rangeMaxName}
                rules={{
                  required: 'This field is required',
                  min: { value: 1, message: 'Minimum value is 0' },
                  max: { value: 9, message: 'Maximum value is 9' },
                  pattern: {
                    value: /^[0-9]$/,
                    message: 'Please enter a number between 1 and 9',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    label="max"
                    style={styles.rangedTextInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                    error={!!error}
                    keyboardType="numeric"
                    mode={'outlined'}
                  />
                )}
              />
            </View>
          ) : (
            <>
              <Controller
                control={control}
                name={singleName}
                rules={{
                  required: 'This field is required',
                  min: { value: 0, message: 'Minimum value is 0' },
                  max: { value: 9, message: 'Maximum value is 9' },
                  pattern: {
                    value: /^[0-9]$/,
                    message: 'Please enter a number between 0 and 9',
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextInput
                    label="value"
                    style={styles.singleTextInput}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                    error={!!error}
                    keyboardType="numeric"
                    mode={'outlined'}
                  />
                )}
              />
            </>
          )}
        </View>
        <View style={styles.exerciseRangeContainer}>
          <Text>Range</Text>
          <Switch value={useRange} onValueChange={setUseRange} />
        </View>
      </View>
    </View>
  )
}

export const AddExercise = ({ weekId, dayId }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [useRangeForWarmupSets, setUseRangeForWarmupSets] = useState(false)
  const [useRangeForWarmupReps, setUseRangeForWarmupReps] = useState(false)
  const [useRangeForWarmupRPE, setUseRangeForWarmupRPE] = useState(false)

  const [useRangeForWorkingSets, setUseRangeForWorkingSets] = useState(false)
  const [useRangeForWorkingReps, setUseRangeForWorkingReps] = useState(false)
  const [useRangeForWorkingRPE, setUseRangeForWorkingRPE] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const createPayload = (data) => {
    const constructAmountPayload = (amountData) => {
      return amountData.useRange
        ? {
            isRange: true,
            min: amountData.range.min,
            max: amountData.range.max,
          }
        : {
            isRange: false,
            value: amountData.single,
          }
    }

    const warmupPayload = {
      sets: constructAmountPayload(data.warmup.sets.amount),
      reps: constructAmountPayload(data.warmup.reps.amount),
      rpe: constructAmountPayload(data.warmup.rpe.amount),
    }

    const workingPayload = {
      sets: constructAmountPayload(data.working.sets.amount),
      reps: constructAmountPayload(data.working.reps.amount),
      rpe: constructAmountPayload(data.working.rpe.amount),
    }
  }
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

    const warmupPayload = {}

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
    dispatch(
      exerciseAdded({
        weekId,
        dayId,
        exercise: {
          id: nanoid(),
          name: data.name,
          warmupSets: warmupSetsPayload,
          workingSets: workingSetsPayload,
        },
      })
    )
    hideModal()
    setUseRangeForWarmupSets(false)
    setUseRangeForWarmupReps(false)
    setUseRangeForWarmupRPE(false)

    setUseRangeForWorkingSets(false)
    setUseRangeForWorkingReps(false)
    setUseRangeForWorkingRPE(false)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
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
            <Text className="text-2xl">Add Exercise</Text>
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
                  mode={'outlined'}
                />
              )}
            />
            {errors.name && <Text>Exercise name is required.</Text>}

            {/* 
              warmup sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Warmup</Text>
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWarmupSets}
                setUseRange={setUseRangeForWarmupSets}
                rangeMinName={'warmup.sets.amount.range.min'}
                rangeMaxName={'warmup.sets.amount.range.max'}
                singleName={'warmup.sets.amount.single'}
                label={'Sets amount'}
              />
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWarmupReps}
                setUseRange={setUseRangeForWarmupReps}
                rangeMinName={'warmup.reps.amount.range.min'}
                rangeMaxName={'warmup.reps.amount.range.max'}
                singleName={'warmup.reps.amount.single'}
                label={'Reps amount'}
              />
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWarmupRPE}
                setUseRange={setUseRangeForWarmupRPE}
                rangeMinName={'warmup.rpe.amount.range.min'}
                rangeMaxName={'warmup.rpe.amount.range.max'}
                singleName={'warmup.rpe.amount.single'}
                label={'RPE amount'}
              />
            </View>

            {/* 
              working sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Working</Text>
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWorkingSets}
                setUseRange={setUseRangeForWorkingSets}
                rangeMinName={'working.sets.amount.range.min'}
                rangeMaxName={'working.sets.amount.range.max'}
                singleName={'working.sets.amount.single'}
                label={'Sets amount'}
              />
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWorkingReps}
                setUseRange={setUseRangeForWorkingReps}
                rangeMinName={'working.reps.amount.range.min'}
                rangeMaxName={'working.reps.amount.range.max'}
                singleName={'working.reps.amount.single'}
                label={'Reps amount'}
              />
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWorkingRPE}
                setUseRange={setUseRangeForWorkingRPE}
                rangeMinName={'working.rpe.amount.range.min'}
                rangeMaxName={'working.rpe.amount.range.max'}
                singleName={'working.rpe.amount.single'}
                label={'RPE amount'}
              />
            </View>

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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // width: '20%',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 30,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    // width: 75,
    margin: 4,
  },
  switchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 15,
  },
  exerciseDataContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
  },
  exerciseDataContainer2: {
    // borderWidth: 1,
    // borderColor: 'blue',
    // borderRadius: 15,
    // padding: 5,
  },
  exerciseDataContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'green',
    // borderRadius: 15,
    // padding: 5,
  },
  exerciseNumberInputContainer: {
    flexDirection: 'row',
    flex: 2,
    // borderWidth: 1,
    // borderColor: 'purple',
    // borderRadius: 15,
    // padding: 5,
  },
  exerciseDataContainer5: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'orange',
    // borderRadius: 15,
  },
  exerciseRangeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'yellow',
    // borderRadius: 15,
  },
  singleTextInput: {
    flex: 1,
  },
  rangedTextInput: {
    width: 70,
  },
})
