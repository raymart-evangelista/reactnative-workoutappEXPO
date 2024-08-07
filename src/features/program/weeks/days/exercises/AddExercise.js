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
import { exerciseAdded } from '../../../../programSlice'
import { nanoid } from '@reduxjs/toolkit'
import { StyleSheet, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useTheme } from '../../../../../themes/ThemeContext'
import { useThemedStyles } from '../../../../../styles/globalStyles'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const exerciseSchema = yup.object({
  name: yup.string().required('* Exercise name is required'),
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
              .min(1, '*min sets value must be at least 1')
              .max(99, '*max sets value must be at most 99'),
          otherwise: (schema) => schema.notRequired(),
        }),
      min: yup
        .number()
        .typeError('*min sets value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) =>
            schema
              .min(1, '*min sets value must be at least 1')
              .lessThan(
                yup.ref('max'),
                '*min sets value must be less than max sets value'
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
      max: yup
        .number()
        .typeError('*max sets value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .moreThan(
                yup.ref('min'),
                '*max sets value must be greater than min sets value'
              )
              .max(99, '*max sets value must be at most 99'),
          otherwise: (schema) => schema.notRequired(),
        }),
    }),
    reps: yup.object({
      useRange: yup.boolean(),
      single: yup
        .number()
        .typeError('*reps value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: false,
          then: (schema) =>
            schema
              .min(1, '*min reps value must be at least 1')
              .max(99, '*max reps value must be at most 99'),
          otherwise: (schema) => schema.notRequired(),
        }),
      min: yup
        .number()
        .typeError('*min reps value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) =>
            schema
              .min(1, '*min reps value must be at least 1')
              .lessThan(
                yup.ref('max'),
                '*min reps value must be less than max reps value'
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
      max: yup
        .number()
        .typeError('*max reps value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .moreThan(
                yup.ref('min'),
                '*max reps value must be greater than min reps value'
              )
              .max(99, '*max reps value must be at most 99'),
          otherwise: (schema) => schema.notRequired(),
        }),
    }),
    rpe: yup.object({
      useRange: yup.boolean(),
      single: yup
        .number()
        .typeError('*rpe value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: false,
          then: (schema) =>
            schema
              .min(1, '*min rpe value must be at least 1')
              .max(10, '*max rpe value must be at most 10'),
          otherwise: (schema) => schema.notRequired(),
        }),
      min: yup
        .number()
        .typeError('*min rpe value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) =>
            schema
              .min(1, '*min rpe value must be at least 1')
              .lessThan(
                yup.ref('max'),
                '*min rpe value must be less than max rpe value'
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
      max: yup
        .number()
        .typeError('*max rpe value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .moreThan(
                yup.ref('min'),
                '*max rpe value must be greater than min rpe value'
              )
              .max(10, '*max rpe value must be at most 10'),
          otherwise: (schema) => schema.notRequired(),
        }),
    }),
  }),
  working: yup.object({
    sets: yup.object({
      useRange: yup.boolean(),
      single: yup
        .number()
        .typeError('*sets value must be a number')
        .when('useRange', {
          is: false,
          then: (schema) =>
            schema
              .min(1, '*min sets value must be at least 1')
              .max(99, '*max sets value must be at most 99'),
          otherwise: (schema) => schema.strip(),
        }),
      min: yup
        .number()
        .typeError('*min sets value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) =>
            schema
              .min(1, '*min sets value must be at least 1')
              .lessThan(
                yup.ref('max'),
                '*min sets value must be less than max sets value'
              )
              .required('*min sets value is required'),
          otherwise: (schema) => schema.strip(),
        }),
      max: yup
        .number()
        .typeError('*max sets value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .moreThan(
                yup.ref('min'),
                '*max sets value must be greater than min sets value'
              )
              .max(99, '*max sets value must be at most 99')
              .required('*max sets value is required'),
          otherwise: (schema) => schema.strip(),
        }),
    }),
    reps: yup.object({
      useRange: yup.boolean(),
      single: yup
        .number()
        .typeError('*reps value must be a number')
        .when('useRange', {
          is: false,
          then: (schema) =>
            schema
              .min(1, '*min reps value must be at least 1')
              .max(99, '*max reps value must be at most 99'),
          otherwise: (schema) => schema.strip(),
        }),
      min: yup
        .number()
        .typeError('*min reps value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) =>
            schema
              .min(1, '*min reps value must be at least 1')
              .lessThan(
                yup.ref('max'),
                '*min reps value must be less than max reps value'
              )
              .required('*min reps value is required'),
          otherwise: (schema) => schema.strip(),
        }),
      max: yup
        .number()
        .typeError('*max reps value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .moreThan(
                yup.ref('min'),
                '*max reps value must be greater than min reps value'
              )
              .max(99, '*max reps value must be at most 99')
              .required('*max reps value is required'),
          otherwise: (schema) => schema.strip(),
        }),
    }),
    rpe: yup.object({
      useRange: yup.boolean(),
      single: yup
        .number()
        .typeError('*rpe value must be a number')
        .when('useRange', {
          is: false,
          then: (schema) =>
            schema
              .min(1, '*min rpe value must be at least 1')
              .max(10, '*max rpe value must be at most 10'),
          otherwise: (schema) => schema.strip(),
        }),
      min: yup
        .number()
        .typeError('*min rpe value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when('useRange', {
          is: true,
          then: (schema) =>
            schema
              .min(1, '*min rpe value must be at least 1')
              .lessThan(
                yup.ref('max'),
                '*min rpe value must be less than max rpe value'
              )
              .required('*min rpe value is required'),
          otherwise: (schema) => schema.strip(),
        }),
      max: yup
        .number()
        .typeError('*max rpe value must be a number')
        .nullable(true)
        .transform((value, originalValue) =>
          originalValue.trim() === '' ? undefined : Number(originalValue)
        )
        .when(['useRange', 'min'], {
          is: (useRange, min, schema) => useRange === true,
          then: (schema, context) =>
            schema
              .moreThan(
                yup.ref('min'),
                '*max rpe value must be greater than min rpe value'
              )
              .max(10, '*max rpe value must be at most 10')
              .required('*max rpe value is required'),
          otherwise: (schema) => schema.strip(),
        }),
    }),
  }),
})
const RangeOrSingleInput = ({
  watch,
  trigger,
  setValue,
  resetField,
  control,
  sectionType,
  subSectionType,
  label,
  touchedFields,
  errors,
}) => {
  const styles = useThemedStyles()
  const errorMin = errors?.[sectionType]?.[subSectionType]?.min?.message
  const errorMax = errors?.[sectionType]?.[subSectionType]?.max?.message
  const errorSingle = errors?.[sectionType]?.[subSectionType]?.single?.message
  const useRangeName = `${sectionType}.${subSectionType}.useRange`
  const minName = `${sectionType}.${subSectionType}.min`
  const maxName = `${sectionType}.${subSectionType}.max`
  const singleName = `${sectionType}.${subSectionType}.single`
  const useRangeValue = watch(useRangeName)
  const min = watch(minName)
  const max = watch(maxName)
  // console.log(errors?.working)
  // console.log(touchedFields)

  useEffect(() => {
    if (useRangeValue) {
      resetField(singleName, { defaultValue: '' })
    } else {
      resetField(minName, { defaultValue: '' })
      resetField(maxName, { defaultValue: '' })
    }
  }, [useRangeValue])

  useEffect(() => {
    if (useRangeValue) {
      trigger(minName)
    }
  }, [min, max])

  useEffect(() => {
    if (useRangeValue) {
      trigger(maxName)
    }
  }, [min])

  return (
    <View style={styles.exerciseDataContainer2}>
      <Text className="text-lg">{label}</Text>
      <View style={styles.exerciseDataContainer3}>
        <View style={styles.exerciseNumberInputContainer}>
          <View style={styles.exerciseRangeContainer}>
            <Text>Range</Text>
            <Controller
              control={control}
              name={useRangeName}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Switch
                    value={value}
                    onValueChange={(newValue) => {
                      onChange(newValue)
                      if (newValue) {
                        setValue(singleName, '')
                      } else {
                        setValue(minName, '')
                        setValue(maxName, '')
                      }
                    }}
                    onBlur={onBlur}
                  />
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
      {useRangeValue && !errorMin && touchedFields.min && (
        <Text style={styles.validText}>✓ min value is valid</Text>
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
  const styles = useThemedStyles()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    resetField,
    formState,
    formState: { errors, isSubmitSuccessful, touchedFields },
  } = useForm({
    resolver: yupResolver(exerciseSchema),
    mode: 'onTouched',
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
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <KeyboardAwareScrollView>
            <Text className="text-2xl">Add Exercise</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error, isTouched },
              }) => (
                <TextInput
                  label="Exercise Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ''}
                  style={styles.input}
                  error={!!error}
                  mode={'outlined'}
                  // outlineStyle={!error && isTouched ? styles.greenOutline : {}}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}

            {touchedFields.name && !errors.name && (
              <Text style={styles.validText}>✓ Exercise name is valid</Text>
            )}

            {/* 
              warmup sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Warmup</Text>
              <RangeOrSingleInput
                watch={watch}
                trigger={trigger}
                setValue={setValue}
                resetField={resetField}
                control={control}
                sectionType={'warmup'}
                subSectionType={'sets'}
                label={'Sets amount'}
                touchedFields={touchedFields}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                trigger={trigger}
                setValue={setValue}
                resetField={resetField}
                control={control}
                sectionType={'warmup'}
                subSectionType={'reps'}
                label={'Reps amount'}
                touchedFields={touchedFields}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                trigger={trigger}
                setValue={setValue}
                resetField={resetField}
                control={control}
                sectionType={'warmup'}
                subSectionType={'rpe'}
                label={'RPE amount'}
                touchedFields={touchedFields}
                errors={errors}
              />
            </View>

            {touchedFields.warmup?.sets &&
              touchedFields.warmup?.reps &&
              touchedFields.warmup?.rpe &&
              !errors.warmup && (
                <Text style={styles.validText}>✓ Warmup inputs are valid</Text>
              )}

            {/* 
              working sets
            */}

            <View style={styles.exerciseDataContainer}>
              <Text className="text-2xl">Working</Text>
              <RangeOrSingleInput
                watch={watch}
                trigger={trigger}
                setValue={setValue}
                resetField={resetField}
                control={control}
                sectionType={'working'}
                subSectionType={'sets'}
                label={'Sets amount'}
                touchedFields={touchedFields}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                trigger={trigger}
                setValue={setValue}
                resetField={resetField}
                control={control}
                sectionType={'working'}
                subSectionType={'reps'}
                label={'Reps amount'}
                touchedFields={touchedFields}
                errors={errors}
              />
              <RangeOrSingleInput
                watch={watch}
                trigger={trigger}
                setValue={setValue}
                resetField={resetField}
                control={control}
                sectionType={'working'}
                subSectionType={'rpe'}
                label={'RPE amount'}
                touchedFields={touchedFields}
                errors={errors}
              />
            </View>

            {touchedFields.working?.sets &&
              touchedFields.working?.reps &&
              touchedFields.working?.rpe &&
              !errors.working && (
                <Text style={styles.validText}>✓ Working inputs are valid</Text>
              )}

            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </KeyboardAwareScrollView>
        </Modal>
      </Portal>
      {/* <AnimatedFAB
        icon="plus"
        label="Add Exercise"
        onPress={onAddExerciseClicked}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fabStyle}
        extended="true"
      /> */}
      <Button icon={'plus'} onPress={onAddExerciseClicked}>
        Add Exercise
      </Button>
    </>
  )
}
