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

const exerciseSchema = yup.object({
  name: yup.string().required('*Exercise name is required'),
  warmup: yup.object({
    sets: yup.object({
      useRange: yup.boolean(),
      single: yup
        .number()
        .typeError('*sets value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: false,
          then: (schema) =>
            schema
              .min(1, '*minimum set value must be 1 or greater')
              .max(10, '*minimum set value must be 10 or less'),
          otherwise: (schema) => schema.notRequired(),
        }),
      min: yup
        .number()
        .typeError('*sets min value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) => schema.min(1, '*min value must be 1 or greater'),
          otherwise: (schema) => schema.notRequired(),
        }),
      max: yup
        .number()
        .typeError('*sets max value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .min(yup.ref('min'), '*max must be greater than min')
              .max(10, '*max set value must be 10 or less'),
          otherwise: (schema) => schema.notRequired(),
        }),
      // min: yup.number().when('useRange', {
      //   is: true,
      //   then: yup.number().min(1, 'Minimum 1 set required'),
      //   otherwise: yup.number().notRequired(),
      // }),
      // max: yup.number().when('useRange', {
      //   is: true,
      //   then: yup
      //     .number()
      //     .min(yup.ref('min'), 'Max must be greater than min')
      //     .max(10, 'Maximum 10 sets allowed'),
      //   otherwise: yup.number().notRequired(),
      // }),
    }),
  }),
})
const RangeOrSingleInput = ({
  watch,
  control,
  sectionType,
  subSectionType,
  label,
  errors,
}) => {
  const errorMin = errors?.[sectionType]?.[subSectionType]?.min?.message
  const errorMax = errors?.[sectionType]?.[subSectionType]?.max?.message
  const errorSingle = errors?.[sectionType]?.[subSectionType]?.single?.message
  const useRangeName = `${sectionType}.${subSectionType}.useRange`
  const minName = `${sectionType}.${subSectionType}.min`
  const maxName = `${sectionType}.${subSectionType}.max`
  const singleName = `${sectionType}.${subSectionType}.single`
  console.log(singleName)
  const useRangeValue = watch(useRangeName)
  console.log(`this is useRangeName: ${useRangeName}`)
  console.log(errors?.[sectionType]?.[subSectionType])

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
                name={minName}
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
                name={maxName}
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
      {useRangeValue && errorMin && (
        <Text style={styles.errorText}>{errorMin}</Text>
      )}
      {useRangeValue && errorMax && (
        <Text style={styles.errorText}>{errorMax}</Text>
      )}
      {!useRangeValue && errorSingle && (
        <Text style={styles.errorText}>{errorSingle}</Text>
      )}
    </View>
  )
}

export const AddExercise = ({ weekId, dayId }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  // const [useRangeForWarmupSets, setUseRangeForWarmupSets] = useState(false)
  // const [useRangeForWarmupReps, setUseRangeForWarmupReps] = useState(false)
  // const [useRangeForWarmupRPE, setUseRangeForWarmupRPE] = useState(false)

  // const [useRangeForWorkingSets, setUseRangeForWorkingSets] = useState(false)
  // const [useRangeForWorkingReps, setUseRangeForWorkingReps] = useState(false)
  // const [useRangeForWorkingRPE, setUseRangeForWorkingRPE] = useState(false)

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
          single: '',
          min: '',
          max: '',
          useRange: false,
        },
        reps: {
          single: '',
          min: '',
          max: '',
          useRange: false,
        },
        rpe: {
          single: '',
          min: '',
          max: '',
          useRange: false,
        },
      },
      working: {
        sets: {
          single: '',
          min: '',
          max: '',
          useRange: false,
        },
        reps: {
          single: '',
          min: '',
          max: '',
          useRange: false,
        },
        rpe: {
          single: '',
          min: '',
          max: '',
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
            single: data.warmup.sets.useRange
              ? ''
              : parseInt(data.warmup.sets.single, 10),
            min: data.warmup.sets.useRange
              ? parseInt(data.warmup.sets.min, 10)
              : '',
            max: data.warmup.sets.useRange
              ? parseInt(data.warmup.sets.max, 10)
              : '',
            useRange: data.warmup.sets.useRange,
          },
          reps: {
            single: data.warmup.reps.useRange
              ? ''
              : parseInt(data.warmup.reps.single, 10),
            min: data.warmup.reps.useRange
              ? parseInt(data.warmup.reps.min, 10)
              : '',
            max: data.warmup.reps.useRange
              ? parseInt(data.warmup.reps.max, 10)
              : '',
            useRange: data.warmup.reps.useRange,
          },
          rpe: {
            single: data.warmup.rpe.useRange
              ? ''
              : parseInt(data.warmup.rpe.single, 10),
            min: data.warmup.rpe.useRange
              ? parseInt(data.warmup.rpe.min, 10)
              : '',
            max: data.warmup.rpe.useRange
              ? parseInt(data.warmup.rpe.max, 10)
              : '',
            useRange: data.warmup.rpe.useRange,
          },
        },
        working: {
          sets: {
            single: data.working.sets.useRange
              ? ''
              : parseInt(data.working.sets.single, 10),
            min: data.working.sets.useRange
              ? parseInt(data.working.sets.min, 10)
              : '',
            max: data.working.sets.useRange
              ? parseInt(data.working.sets.max, 10)
              : '',
            useRange: data.working.sets.useRange,
          },
          reps: {
            single: data.working.reps.useRange
              ? ''
              : parseInt(data.working.reps.single, 10),
            min: data.working.reps.useRange
              ? parseInt(data.working.reps.min, 10)
              : '',
            max: data.working.reps.useRange
              ? parseInt(data.working.reps.max, 10)
              : '',
            useRange: data.working.reps.useRange,
          },
          rpe: {
            single: data.working.rpe.useRange
              ? ''
              : parseInt(data.working.rpe.single, 10),
            min: data.working.rpe.useRange
              ? parseInt(data.working.rpe.min, 10)
              : '',
            max: data.working.rpe.useRange
              ? parseInt(data.working.rpe.max, 10)
              : '',
            useRange: data.working.rpe.useRange,
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
            single: '',
            min: '',
            max: '',
            useRange: false,
          },
          reps: {
            single: '',
            min: '',
            max: '',
            useRange: false,
          },
          rpe: {
            single: '',
            min: '',
            max: '',
            useRange: false,
          },
        },
        working: {
          sets: {
            single: '',
            min: '',
            max: '',
            useRange: false,
          },
          reps: {
            single: '',
            min: '',
            max: '',
            useRange: false,
          },
          rpe: {
            single: '',
            min: '',
            max: '',
            useRange: false,
          },
        },
      })
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
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}

            {/* 
              warmup sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Warmup</Text>
              <RangeOrSingleInput
                watch={watch}
                control={control}
                sectionType={'warmup'}
                subSectionType={'sets'}
                label={'Sets amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                sectionType={'warmup'}
                subSectionType={'reps'}
                label={'Reps amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
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
                sectionType={'working'}
                subSectionType={'sets'}
                label={'Sets amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                sectionType={'working'}
                subSectionType={'reps'}
                label={'Reps amount'}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                control={control}
                sectionType={'working'}
                subSectionType={'rpe'}
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
