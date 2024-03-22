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
  name: yup.string().required('Exercise namee is required'),
  warmup: yup.object({
    sets: yup.object({
      useRange: yup.boolean(),
      amount: yup.object({
        single: yup.number().when('useRange', {
          is: false,
          then: yup
            .number()
            .nullable(true)
            .transform((value, originalValue) =>
              String(originalValue).trim() === '' ? null : value
            )
            .typeError('*Sets amount must be a number')
            .min(1, '*Sets amount must be at least 1')
            .max(10, '*Sets amount must be at most 10')
            .notRequired(),
        }),
        range: yup.object({
          min: yup
            .number()
            .nullable(true)
            .transform((value, originalValue) =>
              String(originalValue).trim() === '' ? null : value
            )
            .typeError('*Sets minimum amount must be a number')
            .min(1, '*Sets minimum must be at least 1')
            .max(10, '*Sets amount must be at most 10')
            .notRequired(),
          max: yup
            .number()
            .nullable(true)
            .transform((value, originalValue) =>
              String(originalValue).trim() === '' ? null : value
            )
            .typeError('*Sets maximum amount must be a number')
            .min(1, '*Sets maximum amount must be at least 1')
            .max(10, '*Sets maximum amount must be at most 10')
            .notRequired()
            .moreThan(
              yup.ref('min'),
              'Sets maximum must be greater than minimum amount'
            ),
        }),
      }),
    }),
  }),
})
const RangeOrSingleInput = ({
  watch,
  control,
  useRange,
  setUseRange,
  rangeMinName,
  rangeMaxName,
  singleName,
  sectionType,
  subSectionType,
  label,
  errors,
}) => {
  const errorMin =
    errors?.[sectionType]?.[subSectionType]?.amount?.range?.min?.message
  const errorMax =
    errors?.[sectionType]?.[subSectionType]?.amount?.range?.max?.message
  const errorSingle =
    errors?.[sectionType]?.[subSectionType]?.amount?.single?.message
  const useRangeName = `${sectionType}.${subSectionType}.useRange`
  const useRangeValue = watch(useRangeName)

  return (
    <View style={styles.exerciseDataContainer2}>
      <Text className="text-lg">{label}</Text>
      <View style={styles.exerciseDataContainer3}>
        <View style={styles.exerciseNumberInputContainer}>
          <View style={styles.exerciseRangeContainer}>
            <Text>Range</Text>
            {/* <Switch value={useRange} onValueChange={setUseRange} /> */}
            <Controller
              control={control}
              name={useRangeName}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                  />
                  {value && <Text>Switch is on</Text>}
                  {!value && <Text>Switch is off</Text>}
                </>
              )}
            />
          </View>
          {useRangeValue ? (
            <View style={styles.exerciseDataContainer5}>
              <Controller
                control={control}
                name={rangeMinName}
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
              {errorMin && <Text>{errorMin.message}</Text>}
              <Text style={styles.dash}>-</Text>
              <Controller
                control={control}
                name={rangeMaxName}
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
              {errorMax && <Text>{errorMax.message}</Text>}
            </View>
          ) : (
            <View style={styles.exerciseDataContainer5}>
              <Controller
                control={control}
                name={singleName}
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
            </View>
          )}
        </View>
      </View>
      {errorMin && <Text style={styles.errorText}>{errorMin}</Text>}
      {errorMax && <Text style={styles.errorText}>{errorMax}</Text>}
      {errorSingle && <Text style={styles.errorText}>{errorSingle}</Text>}
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
    watch,
    formState,
    formState: { errors, isSubmitSuccessful },
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
            {errors.name && <Text>{errors.name.message}</Text>}

            {/* 
              warmup sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Warmup</Text>
              <RangeOrSingleInput
                watch={watch}
                control={control}
                useRange={useRangeForWarmupSets}
                setUseRange={setUseRangeForWarmupSets}
                rangeMinName={'warmup.sets.amount.range.min'}
                rangeMaxName={'warmup.sets.amount.range.max'}
                singleName={'warmup.sets.amount.single'}
                sectionType={'warmup'}
                subSectionType={'sets'}
                label={'Sets amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                useRange={useRangeForWarmupReps}
                setUseRange={setUseRangeForWarmupReps}
                rangeMinName={'warmup.reps.amount.range.min'}
                rangeMaxName={'warmup.reps.amount.range.max'}
                singleName={'warmup.reps.amount.single'}
                sectionType={'warmup'}
                subSectionType={'reps'}
                label={'Reps amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                useRange={useRangeForWarmupRPE}
                setUseRange={setUseRangeForWarmupRPE}
                rangeMinName={'warmup.rpe.amount.range.min'}
                rangeMaxName={'warmup.rpe.amount.range.max'}
                singleName={'warmup.rpe.amount.single'}
                sectionType={'warmup'}
                subSectionType={'rpe'}
                label={'RPE amount'}
                errors={errors}
              />
            </View>

            {/* 
              working sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Working</Text>
              <RangeOrSingleInput
                watch={watch}
                control={control}
                useRange={useRangeForWorkingSets}
                setUseRange={setUseRangeForWorkingSets}
                rangeMinName={'working.sets.amount.range.min'}
                rangeMaxName={'working.sets.amount.range.max'}
                singleName={'working.sets.amount.single'}
                label={'Sets amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                useRange={useRangeForWorkingReps}
                setUseRange={setUseRangeForWorkingReps}
                rangeMinName={'working.reps.amount.range.min'}
                rangeMaxName={'working.reps.amount.range.max'}
                singleName={'working.reps.amount.single'}
                label={'Reps amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                useRange={useRangeForWorkingRPE}
                setUseRange={setUseRangeForWorkingRPE}
                rangeMinName={'working.rpe.amount.range.min'}
                rangeMaxName={'working.rpe.amount.range.max'}
                singleName={'working.rpe.amount.single'}
                label={'RPE amount'}
                errors={errors}
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
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
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 15,
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
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 15,
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
