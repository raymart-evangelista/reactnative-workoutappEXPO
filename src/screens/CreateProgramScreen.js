import { useEffect, useState } from "react"
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper'
import * as Yup from 'yup';

import TextInput from "../components/TextInput";

import programsService from "../services/programs";

const Days = ({ weekIndex, week, name, handleChange, setFieldValue }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <View>
        {week.dayDetails && week.dayDetails.length ? (
          week.dayDetails.map((day, dayIndex) => (
            <List.AccordionGroup key={dayIndex}>
              <View key={dayIndex}>
                <List.Accordion 
                  left={(props) => <List.Icon {...props} icon='calendar-today' /> }
                  title={`Week ${weekIndex + 1}, Day ${dayIndex + 1}`} 
                  id={`${dayIndex}`}
                >  
                  <Field name={`${name}.${dayIndex}.dayNum`}
                  >
                    {({ field }) => (
                      <View style={{ flexDirection: 'row' }}>
                        {/* <Text>Day number: {dayIndex + 1}</Text> */}
                        <Button 
                          icon='minus' 
                          mode='elevated' 
                          onPress={() => {
                            // arrayHelpers.remove(day)
                            const newDayDetails = week.dayDetails.filter((day, index) => index !== dayIndex )
                            const updatedDayDetails = newDayDetails.map((day, index) => ({
                              ...day,
                              dayNum: index + 1
                            }))
                            setFieldValue(`weekDetails.${weekIndex}.dayDetails`, updatedDayDetails)
                            // setFieldValue('weeks', values.weekDetails.length - 1)
                          }}
                          style={{ borderRadius: 5}}>
                          {/* remove day ({dayIndex + 1}/7) */}
                          remove day {dayIndex + 1}
                        </Button>
                    </View>
                    )}
                  </Field>
                  <Field name={`${name}.${dayIndex}.name`}>
                    {({ field }) => (
                      <View>
                        <TextInput
                          field={field}
                          label={`Day ${dayIndex + 1} Name`}
                        />
                      </View>
                    )}
                    
                  </Field>
                  <Exercises
                    week={week}
                    // name={`dayDetails.${dayIndex}.exercises`}
                    name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises`}
                    day={day}
                    handleChange={handleChange}
                  />
                </List.Accordion>
              </View>
            </List.AccordionGroup>

          ))
        ) : (
          <View>
            <Text>No days right now</Text>
          </View>
        )}
        {week.dayDetails && week.dayDetails.length < 7 ? (
        <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
          <Button
            icon='plus'
            mode='contained'
            onPress={() => arrayHelpers.push(
              {
                name: '',
                dayNum: week.dayDetails.length + 1,
                exercises: [],
              }
            )}
            style={{ borderRadius: 5 }}
          >
            add day
          </Button>
        </View>
        ): (
          // <Text>Reached max days for week</Text>
          <View></View>
        )}
      </View>
    )}
  >
  </FieldArray>
)

const Exercises = ({ week, day, name, handleChange }) => {
  const [weightUnits, setWeightUnits] = useState('lbs')
  const [timeUnits, setTimeUnits] = useState('minutes')

  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <View>
          {day.exercises.length ? (
            day.exercises.map((exercise, exerciseIndex) => (
              <List.AccordionGroup key={exerciseIndex}>
                <View key={exerciseIndex}>
                  <List.Accordion 
                    left={(props) => <List.Icon {...props} icon='calendar-today' /> }
                    title={`Exercise ${exerciseIndex + 1}`} 
                    id={`${exerciseIndex}`}
                  >
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Button
                      icon='minus'
                      mode='contained'
                      onPress={() => arrayHelpers.remove(exercise)}
                      title="remove exercise"
                      style={{ borderRadius: 5}}
                    >
                      remove exercise
                    </Button>
                  </View>
                    <Field name={`${name}.${exerciseIndex}.name`}>
                      {({ field }) => (
                        <View>
                          <TextInput 
                            field={field}
                            label={`Exercise ${exerciseIndex + 1} Name`}
                          />
                        </View>
                      )}
                    </Field>
                    <Text>warmup sets: </Text>
                    <View style={{ flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Field name={`${name}.${exerciseIndex}.warmupSets.min`}>
                          {({ field }) => (
                            <View>
                              <TextInput
                                field={field}
                                label={`min`}
                              />
                            </View>
                          )}
                        </Field>
                      </View>
                      <Text> - </Text>
                      <View style={{ flex: 1 }}>
                        <Field name={`${name}.${exerciseIndex}.warmupSets.max`}>
                          {({ field }) => (
                            <View>
                              <TextInput
                                field={field}
                                label={`max`}
                              />
                            </View>
                          )}
                        </Field>
                      </View>
                    </View>
                    <Text>working sets: </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1 }}>
                        <Field name={`${name}.${exerciseIndex}.workingSets.min`}>
                          {({ field }) => (
                            <View>
                            <TextInput
                              field={field}
                              label={`min`}
                            />
                          </View>
                          )}
                        </Field>
                      </View>
                      <Text> - </Text>
                      <View style={{ flex: 1 }}>
                        <Field name={`${name}.${exerciseIndex}.workingSets.max`}>
                          {({ field }) => (
                            <View>
                              <TextInput
                                field={field}
                                label={`max`}
                              />
                            </View>
                          )}
                        </Field>
                      </View>
                    </View>
                    <Text>reps: </Text>
                    <View>
                      <Field name={`${name}.${exerciseIndex}.reps.min`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>min: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} min reps`}
                            /> */}
                          </View>
                        )}
                      </Field>
                      <Text> - </Text>
                      <Field name={`${name}.${exerciseIndex}.reps.max`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>max: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} max reps`}
                            /> */}
                          </View>
                        )}
                      </Field>
                      <Field name={`${name}.${exerciseIndex}.reps.notes`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>notes: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} reps notes`}
                            /> */}
                          </View>
                        )}
                      </Field>
                    </View>
                    <Text>weight:</Text>
                    <View>
                      <Field name={`${name}.${exerciseIndex}.weight.value`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>value: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} rest value`}
                            /> */}
                          </View>
                        )}
                      </Field>
                      <Text> - </Text>
                      <Field name={`${name}.${exerciseIndex}.weight.unit`}>
                        {({ field }) => (
                          <View style={{ flexDirection: 'row' }}>
                            <RadioButton.Group
                              onValueChange={handleChange(field.name)}
                              value={field.value}
                            >
                              <View style={styles.row}>
                                <Text>pounds</Text>
                                <RadioButton.Android value='lbs' status={field.value === 'lbs' ? 'checked' : 'unchecked'}/>
                              </View>
                              <View style={styles.row}>
                                <Text>kilograms</Text>
                                <RadioButton.Android value='kgs' status={field.value === 'kgs' ? 'checked' : 'unchecked'}/>
                              </View>
                            </RadioButton.Group>
                          </View>
                        )}
                      </Field>
                    </View>
                    <Text>rpe: </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Field name={`${name}.${exerciseIndex}.rpe.min`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>min: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} min rpe`}
                            /> */}
                          </View>
                        )}
                      </Field>
                      <Text> - </Text>
                      <Field name={`${name}.${exerciseIndex}.rpe.max`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>max: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} max rpe`}
                            /> */}
                          </View>
                        )}
                      </Field>
                    </View>
                    <Text>rest: </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Field name={`${name}.${exerciseIndex}.rest.value`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>value: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} rest value`}
                              keyboardType='numeric'
                            /> */}
                          </View>
                        )}
                      </Field>
                      <Text> - </Text>
                      <Field name={`${name}.${exerciseIndex}.rest.unit`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>unit: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} rest unit`}
                            /> */}
                            <RadioButton.Group
                              onValueChange={handleChange(field.name)}
                              value={field.value}
                            >
                              <View style={styles.row}>
                                <Text>minutes</Text>
                                <RadioButton.Android value='minutes'/>
                              </View>
                              <View style={styles.row}>
                                <Text>seconds</Text>
                                <RadioButton.Android value='seconds'/>
                              </View>
                            </RadioButton.Group>
                          </View>
                        )}
                      </Field>
                    </View>
                    <Text>notes: </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Field name={`${name}.${exerciseIndex}.notes`}>
                        {({ field }) => (
                          <View>
                            {/* <Text>value: </Text>
                            <TextInput
                              style={{
                                borderWidth: 1
                              }}
                              onChangeText={field.onChange(field.name)}
                              onBlur={field.onBlur(field.name)}
                              value={field.value ? field.value.toString() : ''}
                              placeholder={`Exercise ${exerciseIndex + 1} notes`}
                            /> */}
                          </View>
                        )}
                      </Field>
                    </View>
                  </List.Accordion>
                </View>
              </List.AccordionGroup>


            ))
          ): (
            <View></View>
          )}
          {/* <TouchableOpacity
            onPress={() => arrayHelpers.push(
              {
                name: 'ads',
                warmupSets: {
                  min: '1',
                  max: '2',
                }
              }
            )}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add a new exercise</Text>
          </TouchableOpacity> */}
          <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
            <Button
            icon='plus'
            mode='contained'
            onPress={() => arrayHelpers.push({})}
            style={{ borderRadius: 5 }}
          >
            add exercise
          </Button>
        </View>
        </View>
      )}
    >

    </FieldArray>
  )
}

const Weeks = ({ values, setFieldValue, handleChange }) => {

  return (
    <FieldArray
    name="weekDetails"
    render={arrayHelpers => (
      <View>
          {values.weekDetails && values.weekDetails.length > 0 ? (
            values.weekDetails.map((week, weekIndex) => (
              <List.AccordionGroup key={weekIndex}>           
                <View key={weekIndex}>
                  <List.Accordion 
                    left={(props) => <List.Icon {...props} icon='calendar-week' /> }
                    title={`Week ${weekIndex + 1}`} 
                    id={`${weekIndex}`}
                  >
                    <View style={{ alignItems:'flex-start', justifyContent: 'center' }}>
                    <Button 
                      icon='minus' 
                      mode='elevated' 
                      onPress={() => {
                        const newWeekDetails = values.weekDetails.filter((week, index) => index !== weekIndex )
                        const updatedWeekDetails = newWeekDetails.map((week, index) => ({
                          ...week,
                          weekNum: index + 1,
                        }))
                        const newValues = { ...values, weekDetails: updatedWeekDetails }
                        setFieldValue('weekDetails', newValues.weekDetails)
                        setFieldValue('weeks', values.weekDetails.length - 1)
                      }}
                      style={{ borderRadius: 5}}>
                      remove week {weekIndex + 1}
                    </Button>
                    </View>
                    <Field name={`weekDetails.${weekIndex}.weekNum`}>
                      {({ field }) => (
                        <View style={{ flexDirection: 'row' }}>
                          <Text>{`weekDetails.${weekIndex}.weekNum`}</Text>
                        </View>
                      )}
                    </Field>
                    <Days
                      weekIndex={weekIndex}
                      name={`weekDetails.${weekIndex}.dayDetails`}
                      week={week}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
  
                  </List.Accordion>
                </View>
              </List.AccordionGroup>
            ))
          ) : (
            <Text>No weeks</Text>
          )}
          <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
            <Button 
              icon='plus' 
              mode='elevated' 
              onPress={() => {
                arrayHelpers.push(
                  { 
                    weekNum: values.weekDetails.length + 1,
                    dayDetails: []
                  }
                )
                // update weekNum for existing weeks
                values.weekDetails.forEach((week, index) => {
                  setFieldValue(`weekDetails.${index}.weekNum`, index + 1)
                })
                setFieldValue('weeks', values.weekDetails.length + 1)
              }}
              style={{ borderRadius: 5}}>
              add week
            </Button>
          </View>
        </View>
      )}
    />
  )
}

export function ProgramNameInputScreen({ navigation }) {
  const [programName, setProgramName] = useState('')

  const handleSaveProgram = async () => {

    // TODO: backend portion
    // const newProgram = await programsService.createProgram({
    //   name: programName
    // })
    // navigation.reset({
    //   index: 0,
    //   routes: [{
    //     name: 'AddWeeks',
    //     params: { newProgram }
    //   }]
    // })
  }

  const initialValues = {
    name: 'UPPER/LOWER 4x WEEK',
    weeks: 2,
    weekDetails: [
      {
        weekNum: 1,
        dayDetails: [
          {
            name: 'UPPER BODY',
            dayNum: 1,
            exercises: [
              {
                name: 'SEATED CABLE ROW',
                warmupSets: {
                  min: 1,
                  max: 1,
                },
                workingSets: {
                  min: 2,
                  max: 2,
                },
                reps: {
                  min: 10,
                  max: 12,
                  notes: 'drop set',
                },
                weight: {
                  value: 145,
                  unit: 'lbs',
                },
                rpe: {
                  min: 9,
                  max: 10,
                },
                rest: {
                  value: 2,
                  unit: 'minutes',
                },
                notes: 'Focus on squeezing your shoulder blades together, drive your elbows down and back. Last set only do a dropset: perform 10-12 reps, drop the weight by ~50%, perform an additional 10-12 reps.',
              },
              {
                name: 'CABLE PRESS',
                warmupSets: {
                  min: 1,
                  max: 1,
                },
                workingSets: {
                  min: 2,
                  max: 2,
                },
                reps: {
                  min: 10,
                  max: 12,
                  notes: 'drop set',
                },
                weight: {
                  value: 145,
                  unit: 'lbs',
                },
                rpe: {
                  min: 9,
                  max: 10,
                },
                rest: {
                  value: 2,
                  unit: 'minutes',
                },
                notes: 'push chest together.',
              }
            ]
          },
          {
            name: 'LOWER BODY',
            dayNum: 2,
            exercises: [
              {
                name: 'SQUAT',
                warmupSets: {
                  min: 1,
                  max: 1,
                },
                workingSets: {
                  min: 2,
                  max: 2,
                },
                reps: {
                  min: 10,
                  max: 12,
                  notes: 'drop set',
                },
                weight: {
                  value: 145,
                  unit: 'lbs',
                },
                rpe: {
                  min: 9,
                  max: 10,
                },
                rest: {
                  value: 2,
                  unit: 'minutes',
                },
                notes: "don't use momentum"
              }
            ]
          }
        ]
      },
      {
        weekNum: 2,
        dayDetails: [
          {
            name: 'UPPER BODY',
            dayNum: 1,
            exercises: [
              {
                name: 'SEATED CABLE ROW',
                warmupSets: {
                  min: 1,
                  max: 1,
                },
                workingSets: {
                  min: 2,
                  max: 2,
                },
                reps: {
                  min: 10,
                  max: 12,
                  notes: 'drop set',
                },
                weight: {
                  value: 145,
                  unit: 'lbs',
                },
                rpe: {
                  min: 9,
                  max: 10,
                },
                rest: {
                  value: 2,
                  unit: 'minutes',
                },
                notes: 'Focus on squeezing your shoulder blades together, drive your elbows down and back. Last set only do a dropset: perform 10-12 reps, drop the weight by ~50%, perform an additional 10-12 reps.',
              }
            ]
          }
        ]
      }
    ]
  }
  const wantedValues = {
    name: 'UPPER/LOWER 4x WEEK',
    weeks: 2,
    weekDetails: [
      {
        weekNum: 1,
        dayDetails: [
          {
            name: 'UPPER BODY',
            dayNum: 1,
            exercises: [
              {
                name: 'SEATED CABLE ROW',
                warmupSets: {
                  min: 1,
                  max: 1,
                },
                workingSets: {
                  min: 2,
                  max: 2,
                },
                reps: {
                  min: 10,
                  max: 12,
                  notes: 'drop set',
                },
                weight: {
                  value: 145,
                  unit: 'lbs',
                },
                rpe: {
                  min: 9,
                  max: 10,
                },
                rest: {
                  value: 2,
                  unit: 'minutes',
                },
                notes: 'Focus on squeezing your shoulder blades together, drive your elbows down and back. Last set only do a dropset: perform 10-12 reps, drop the weight by ~50%, perform an additional 10-12 reps.',
              }
            ]
          }
        ]
      },
      {
        weekNum: 2,
        dayDetails: [
          {
            name: 'UPPER BODY',
            dayNum: 1,
            exercises: [
              {
                name: 'SEATED CABLE ROW',
                warmupSets: {
                  min: 1,
                  max: 1,
                },
                workingSets: {
                  min: 2,
                  max: 2,
                },
                reps: {
                  min: 10,
                  max: 12,
                  notes: 'drop set',
                },
                weight: {
                  value: 145,
                  unit: 'lbs',
                },
                rpe: {
                  min: 9,
                  max: 10,
                },
                rest: {
                  value: 2,
                  unit: 'minutes',
                },
                notes: 'Focus on squeezing your shoulder blades together, drive your elbows down and back. Last set only do a dropset: perform 10-12 reps, drop the weight by ~50%, perform an additional 10-12 reps.',
              }
            ]
          }
        ]
      }
    ]
  }

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      weeks: prevValues.weekDetails.length
    }))
  }, [values.weekDetails])

  const [value, setValue] = useState('first');
  const [value2, setValue2] = useState('first');

  const { colors, isV3 } = useTheme();
  const TextComponent = isV3 ? Text : Paragraph;

  const NameSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too short!')
      .max(25, 'Too long!')
      .required('Required'),
  })

  return (
    <ScrollView style={{ margin: '2%' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={NameSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const createdProgram = await programsService.createProgram(values);
            alert('Program created successfully')
            navigation.navigate('Home')
          } catch (error) {
            console.error(error)
            alert('An error occurred while creating the program')
          } finally {
            setSubmitting(false)
          }
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          //   setSubmitting(false)
          // }, 400)
        }}
      >
        {({ handlePush, handleRemove, handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
          <View>
            <Field name="name">
              {({ field }) => (
                <View>
                  <TextInput
                    label='program name'
                    field={field}
                  />
                  {errors.name && touched.name ? (
                    <Text>{errors.name}</Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
              )}
            </Field>
            <Text>Weeks: {values.weeks}</Text>
            <Weeks
              values={values}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
            />
            {values.weekDetails && values.weekDetails.length > 0 ? (
              <View>
                <Text>Weeks greater than 0. Amt of weeks: {JSON.stringify(values.weekDetails.length)}</Text>
                <Text>{(JSON.stringify(values, null, 2))}</Text>
              </View>
            ) : (
              <View>
                <Text>Weeks less than 0</Text>
              </View>
            )}
            <TouchableOpacity 
            onPress={handleSubmit} 
            disabled={isSubmitting}
            style={{
              backgroundColor: '#4CAF50',
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignSelf: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});