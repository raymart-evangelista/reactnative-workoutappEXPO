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

import { useTheme } from '../../../../themes/ThemeContext'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const requiredIf = (condition) => (value) => {
  if (condition && !value) return 'This field is required'
  return true
}

const maxSets = (value) => value <= 5 || 'Maximum of 5 sets are allowed'
const maxReps = (value) => value <= 30 || 'Maximum of 30 reps are allowed'
const rpeRange = (value) =>
  (value >= 1 && value <= 10) || 'RPE must be between 1 and 10'

const exerciseSchema = yup.object({
  name: yup.string().required('Exercise name is required'),
  warmup: yup.object().shape({
    sets: yup.object().shape({
      amount: yup.object().shape({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            // .positive('Must be a positive number')
            // .integer('Must be an integer'),
            .min(1, 'Reps must be at least 1')
            .max(10, 'Reps must be at most 99'),
          otherwise: yup.number().notRequired(),
        }),
        range: yup.object().when('useRange', {
          is: true,
          then: yup.object().shape({
            min: yup
              .number()
              // .positive('Must be a positive number')
              // .integer('Must be an integer')
              .min(1, 'Reps must be at least 1')
              .max(10, 'Reps must be at most 99')
              .required('Min is required'),
            max: yup
              .number()
              // .positive('Must be a positive number')
              // .integer('Must be an integer')
              .min(1, 'Reps must be at least 1')
              .max(10, 'Reps must be at most 99')
              .moreThan(yup.ref('min'), 'Max must be greater than Min')
              .required('Max is required'),
          }),
          otherwise: yup.object().notRequired(),
        }),
      }),
      useRange: yup.boolean(),
    }),
    reps: yup.object().shape({
      amount: yup.object().shape({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            .min(1, 'Reps must be at least 1')
            .max(99, 'Reps must be at most 99'),
          otherwise: yup.number().notRequired(),
        }),
        range: yup.object().when('useRange', {
          is: true,
          then: yup.object().shape({
            min: yup
              .number()
              .min(1, 'Reps must be at least 1')
              .max(99, 'Reps must be at most 99')
              // .positive('Must be a positive number')
              // .integer('Must be an integer')
              .required('Min is required'),
            max: yup
              .number()
              // .positive('Must be a positive number')
              // .integer('Must be an integer')
              .min(1, 'Reps must be at least 1')
              .max(99, 'Reps must be at most 99')
              .moreThan(yup.ref('min'), 'Max must be greater than Min')
              .required('Max is required'),
          }),
          otherwise: yup.object().notRequired(),
        }),
      }),
      useRange: yup.boolean(),
    }),
    rpe: yup.object().shape({
      amount: yup.object().shape({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            .min(1, 'RPE must be at least 1')
            .max(10, 'RPE must be at most 10'),
          otherwise: yup.number().notRequired(),
        }),
        range: yup.object().when('useRange', {
          is: true,
          then: yup.object().shape({
            min: yup
              .number()
              .min(1, 'RPE must be at least 1')
              .max(10, 'RPE must be at most 10')
              .required('Min is required'),
            max: yup
              .number()
              .min(1, 'RPE must be at least 1')
              .max(10, 'RPE must be at most 10')
              .moreThan(yup.ref('min'), 'Max must be greater than Min')
              .required('Max is required'),
          }),
          otherwise: yup.object().notRequired(),
        }),
      }),
      useRange: yup.boolean(),
    }),
  }),
  working: yup.object().shape({
    sets: yup.object().shape({
      amount: yup.object().shape({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            .min(1, 'Sets must be at least 1')
            .max(5, 'Sets must be at most 5')
            .required('Sets are required'),
          otherwise: yup.number().notRequired(),
        }),
        range: yup.object().when('useRange', {
          is: true,
          then: yup.object().shape({
            min: yup
              .number()
              .min(1, 'Sets must be at least 1')
              .max(5, 'Sets must be at most 5')
              .required('Min sets is required'),
            max: yup
              .number()
              .min(1, 'Sets must be at least 1')
              .max(5, 'Sets must be at most 5')
              .moreThan(
                yup.ref('min'),
                'Max sets must be greater than Min sets'
              )
              .required('Max sets is required'),
          }),
          otherwise: yup.object().notRequired(),
        }),
      }),
      useRange: yup.boolean(),
    }),
    reps: yup.object().shape({
      amount: yup.object().shape({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            .min(1, 'Reps must be at least 1')
            .max(30, 'Reps must be at most 30')
            .required('Reps are required'),
          otherwise: yup.number().notRequired(),
        }),
        range: yup.object().when('useRange', {
          is: true,
          then: yup.object().shape({
            min: yup
              .number()
              .min(1, 'Reps must be at least 1')
              .max(30, 'Reps must be at most 30')
              .required('Min reps is required'),
            max: yup
              .number()
              .min(1, 'Reps must be at least 1')
              .max(30, 'Reps must be at most 30')
              .moreThan(
                yup.ref('min'),
                'Max reps must be greater than Min reps'
              )
              .required('Max reps is required'),
          }),
          otherwise: yup.object().notRequired(),
        }),
      }),
      useRange: yup.boolean(),
    }),
    rpe: yup.object().shape({
      amount: yup.object().shape({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            .min(1, 'RPE must be at least 1')
            .max(10, 'RPE must be at most 10')
            .required('RPE is required'),
          otherwise: yup.number().notRequired(),
        }),
        range: yup.object().when('useRange', {
          is: true,
          then: yup.object().shape({
            min: yup
              .number()
              .min(1, 'RPE must be at least 1')
              .max(10, 'RPE must be at most 10')
              .required('Min RPE is required'),
            max: yup
              .number()
              .min(1, 'RPE must be at least 1')
              .max(10, 'RPE must be at most 10')
              .moreThan(yup.ref('min'), 'Max RPE must be greater than Min RPE')
              .required('Max RPE is required'),
          }),
          otherwise: yup.object().notRequired(),
        }),
      }),
      useRange: yup.boolean(),
    }),
  }),
})
const RangeOrSingleInput = ({
  control,
  useRange,
  setUseRange,
  rangeMinName,
  rangeMaxName,
  singleName,
  label,
  watch,
}) => {
  return (
    <View style={styles.exerciseDataContainer2}>
      <Text className="text-lg">{label}</Text>
      <View style={styles.exerciseDataContainer3}>
        <View style={styles.exerciseNumberInputContainer}>
          <View style={styles.exerciseRangeContainer}>
            <Text>Range</Text>
            <Switch value={useRange} onValueChange={setUseRange} />
          </View>
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
              <Text style={styles.dash}>-</Text>
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

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({
    resolver: yupResolver(exerciseSchema),
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

    const payload = {
      weekId,
      dayId,
      exercise: {
        id: nanoid(),
        name: data.name,
        warmup: {
          sets: {
            amount: useRangeForWarmupSets
              ? {
                  single: '',
                  range: {
                    min: parseInt(data.warmup.sets.amount.range.min, 10),
                    max: parseInt(data.warmup.sets.amount.range.max, 10),
                  },
                }
              : {
                  single: parseInt(data.warmup.sets.amount.single, 10),
                  range: {
                    min: '',
                    max: '',
                  },
                },
            useRange: useRangeForWarmupSets ? true : false,
          },
          reps: {
            amount: useRangeForWarmupReps
              ? {
                  single: '',
                  range: {
                    min: parseInt(data.warmup.reps.amount.range.min, 10),
                    max: parseInt(data.warmup.reps.amount.range.max, 10),
                  },
                }
              : {
                  single: parseInt(data.warmup.sets.amount.single, 10),
                  range: {
                    min: '',
                    max: '',
                  },
                },
            useRange: useRangeForWarmupReps ? true : false,
          },
          rpe: {
            amount: useRangeForWarmupRPE
              ? {
                  single: '',
                  range: {
                    min: parseInt(data.warmup.rpe.amount.range.min, 10),
                    max: parseInt(data.warmup.rpe.amount.range.max, 10),
                  },
                }
              : {
                  single: parseInt(data.warmup.rpe.amount.single, 10),
                  range: {
                    min: '',
                    max: '',
                  },
                },
            useRange: useRangeForWarmupRPE ? true : false,
          },
        },
        working: {
          sets: {
            amount: useRangeForWorkingSets
              ? {
                  single: '',
                  range: {
                    min: parseInt(data.working.sets.amount.range.min, 10),
                    max: parseInt(data.working.sets.amount.range.max, 10),
                  },
                }
              : {
                  single: parseInt(data.working.sets.amount.single, 10),
                  range: {
                    min: '',
                    max: '',
                  },
                },
            useRange: useRangeForWorkingSets ? true : false,
          },
          reps: {
            amount: useRangeForWorkingReps
              ? {
                  single: '',
                  range: {
                    min: parseInt(data.working.reps.amount.range.min, 10),
                    max: parseInt(data.working.reps.amount.range.max, 10),
                  },
                }
              : {
                  single: parseInt(data.working.sets.amount.single, 10),
                  range: {
                    min: '',
                    max: '',
                  },
                },
            useRange: useRangeForWorkingReps ? true : false,
          },
          rpe: {
            amount: useRangeForWorkingRPE
              ? {
                  single: '',
                  range: {
                    min: parseInt(data.working.rpe.amount.range.min, 10),
                    max: parseInt(data.working.rpe.amount.range.max, 10),
                  },
                }
              : {
                  single: parseInt(data.working.rpe.amount.single, 10),
                  range: {
                    min: '',
                    max: '',
                  },
                },
            useRange: useRangeForWorkingRPE ? true : false,
          },
        },
      },
    }

    console.log(payload)

    dispatch(
      exerciseAdded({
        weekId: payload.weekId,
        dayId: payload.dayId,
        exercise: payload.exercise,
      })
    )

    hideModal()
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
      setUseRangeForWarmupSets(false)
      setUseRangeForWarmupReps(false)
      setUseRangeForWarmupRPE(false)

      setUseRangeForWorkingSets(false)
      setUseRangeForWorkingReps(false)
      setUseRangeForWorkingRPE(false)
    }
  }, [formState, reset])

  const { theme } = useTheme()
  const modalStyle = StyleSheet.create({
    containerStyle: {
      backgroundColor: theme.colors.background,
      padding: 20,
      margin: 30,
      borderRadius: 15,
    },
  })
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle.containerStyle}
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
                watch={watch}
              />
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWarmupReps}
                setUseRange={setUseRangeForWarmupReps}
                rangeMinName={'warmup.reps.amount.range.min'}
                rangeMaxName={'warmup.reps.amount.range.max'}
                singleName={'warmup.reps.amount.single'}
                label={'Reps amount'}
                watch={watch}
              />
              <RangeOrSingleInput
                control={control}
                useRange={useRangeForWarmupRPE}
                setUseRange={setUseRangeForWarmupRPE}
                rangeMinName={'warmup.rpe.amount.range.min'}
                rangeMaxName={'warmup.rpe.amount.range.max'}
                singleName={'warmup.rpe.amount.single'}
                label={'RPE amount'}
                watch={watch}
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
    // margin: 4,
    marginVertical: 10,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  exerciseDataContainer5: {
    // width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignContent: 'space-around',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'orange',
    // borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
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
    // width: 70,
    // padding: 5,
    flex: 1,
  },
  dash: {
    padding: 10,
  },
})
