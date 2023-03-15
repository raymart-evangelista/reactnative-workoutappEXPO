import { useEffect, useState } from "react"
import { Button, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import programsService from "../services/programs";

const Days = ({ weekIndex, week, name }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => (
      <View>
        <Text>weekIndex: {weekIndex}</Text>
        {week.dayDetails.length ? (
          week.dayDetails.map((day, dayIndex) => (
            <View key={dayIndex}>
              <Field name={`${name}.${dayIndex}.dayNum`}
              >
                {({ field }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Day number: {dayIndex + 1}</Text>
                    <Button
                      onPress={() => arrayHelpers.remove(day)}
                      title="remove day"
                    />
                  {/* <TextInput 
                    style={{
                      borderWidth: 1
                    }}
                    onChangeText={field.onChange(field.name)}
                    onBlur={field.onBlur(field.name)}
                    value={field.value ? field.value.toString() : ''}
                    placeholder={`Day ${dayIndex + 1}`}
                  /> */}
                </View>
                )}
              </Field>
              <Field name={`${name}.${dayIndex}.name`}>
                {({ field }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Day name: </Text>
                    <TextInput 
                      style={{
                        borderWidth: 1
                      }}
                      onChangeText={field.onChange(field.name)}
                      onBlur={field.onBlur(field.name)}
                      value={field.value ? field.value.toString() : ''}
                      placeholder={`Day ${dayIndex + 1} Name`}
                    />
                  </View>
                )}
                
              </Field>
              <Exercises
                week={week}
                // name={`dayDetails.${dayIndex}.exercises`}
                name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises`}
                day={day}
              />
            </View>
          ))
        ) : (
          <View>
            <Text>No days right now</Text>
          </View>
        )}
        {week.dayDetails.length < 7 ? (
          <TouchableOpacity 
            onPress={() => arrayHelpers.push(
              {
                name: '',
                dayNum: week.dayDetails.length + 1,
                exercises: [],
              }
            )}
            style={{
              backgroundColor: 'green',
              borderRadius: 5,
              padding: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add a day</Text>
          </TouchableOpacity>
        ): (
          <Text>Reached max days for week</Text>
        )}
      </View>
    )}
  >
  </FieldArray>
)

const Exercises = ({ week, day, name }) => (
  // TODO: add fields

  <FieldArray
    name={name}
    render={arrayHelpers => (
      <View>
        {day.exercises.length ? (
          day.exercises.map((exercise, exerciseIndex) => (
            <View key={exerciseIndex}>
              <Button
                onPress={() => arrayHelpers.remove(exercise)}
                title="remove exercise"
              />
              <Field name={`${name}.${exerciseIndex}.name`}>
                {({ field }) => (
                  <View style={{ flexDirection: 'row' }}>
                    <Text>Exercise name: </Text>
                    <TextInput
                      style={{
                        borderWidth: 1
                      }}
                      onChangeText={field.onChange(field.name)}
                      onBlur={field.onBlur(field.name)}
                      value={field.value ? field.value.toString() : ''}
                      placeholder={`Exercise ${exerciseIndex + 1} Name`}
                    />
                  </View>
                )}
              </Field>
              <Text>warmup sets: </Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.warmupSets.min`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>min: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} min warmup sets`}
                      />
                    </View>
                  )}
                </Field>
                <Text> - </Text>
                <Field name={`${name}.${exerciseIndex}.warmupSets.max`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>max: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} max warmup sets`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>working sets: </Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.workingSets.min`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>min: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} min working sets`}
                      />
                    </View>
                  )}
                </Field>
                <Text> - </Text>
                <Field name={`${name}.${exerciseIndex}.workingSets.max`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>max: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} max working sets`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>reps: </Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.reps.min`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>min: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} min reps`}
                      />
                    </View>
                  )}
                </Field>
                <Text> - </Text>
                <Field name={`${name}.${exerciseIndex}.reps.max`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>max: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} max reps`}
                      />
                    </View>
                  )}
                </Field>
                <Field name={`${name}.${exerciseIndex}.reps.notes`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>notes: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} reps notes`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>weight:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.weight.value`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>value: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} rest value`}
                      />
                    </View>
                  )}
                </Field>
                <Text> - </Text>
                <Field name={`${name}.${exerciseIndex}.weight.unit`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>unit: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} rest unit`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>rpe: </Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.rpe.min`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>min: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} min rpe`}
                      />
                    </View>
                  )}
                </Field>
                <Text> - </Text>
                <Field name={`${name}.${exerciseIndex}.rpe.max`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>max: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} max rpe`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>rest: </Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.rest.value`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>value: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} rest value`}
                        keyboardType='numeric'
                      />
                      
                    </View>
                  )}
                </Field>
                <Text> - </Text>
                <Field name={`${name}.${exerciseIndex}.rest.unit`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>unit: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} rest unit`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>notes: </Text>
              <View style={{ flexDirection: 'row' }}>
                <Field name={`${name}.${exerciseIndex}.notes`}>
                  {({ field }) => (
                    <View style={{ flexDirection: 'row' }}>
                      <Text>value: </Text>
                      <TextInput
                        style={{
                          borderWidth: 1
                        }}
                        onChangeText={field.onChange(field.name)}
                        onBlur={field.onBlur(field.name)}
                        value={field.value ? field.value.toString() : ''}
                        placeholder={`Exercise ${exerciseIndex + 1} notes`}
                      />
                    </View>
                  )}
                </Field>
              </View>
              <Text>-------</Text>
            </View>

          ))
        ): (
          <View></View>
        )}
        <TouchableOpacity
          onPress={() => arrayHelpers.push(
            {
              name: 'ads',
              warmupSets: {
                min: '1',
                max: '2',
              }
            }
          )}
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            padding: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add a new exercise</Text>
        </TouchableOpacity>
        {/* <Text>{JSON.stringify(day)}</Text> */}
        {/* <Text>{JSON.stringify(day.exercises.length)}</Text> */}
        <Text>{name}</Text>
        <Text>-- Week details --</Text>
        <Text>{JSON.stringify(week)}</Text>
        <Text>-- Day details --</Text>
        <Text>{JSON.stringify(day)}</Text>
        <Text>----</Text>
        {/* <Text>{JSON.stringify(week)}</Text> */}
      </View>
    )}
  >

  </FieldArray>
)

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

  return (
      // <View>
      //   <Text>Friend List</Text>
      //   <Formik
      //     initialValues={{ friends: ['jared', 'ian', 'brent'] }}
      //     onSubmit={values =>
      //       setTimeout(() => {
      //         alert(JSON.stringify(values, null, 2));
      //       }, 500)
      //     }
      //   >
      //     {({ values }) => (
      //       <View>
      //         <FieldArray
      //           name="friends"
      //           render={arrayHelpers => (
      //             <View>
      //               {values.friends && values.friends.length > 0 ? (
      //                 values.friends.map((friend, index) => (
      //                   <View key={index}>
      //                     <Field name={`friends.${index}`}>
      //                       {({ field }) => (
      //                         <TextInput
      //                           onChangeText={field.onChange(field.name)}
      //                           onBlur={field.onBlur(field.name)}
      //                           value={field.value}
      //                         />
      //                       )}
      //                     </Field>
      //                     <TouchableOpacity
      //                       onPress={() => arrayHelpers.remove(index)}
      //                     >
      //                       <Text>-</Text>
      //                     </TouchableOpacity>
      //                     <TouchableOpacity
      //                       onPress={() => arrayHelpers.insert(index, '')}
      //                     >
      //                       <Text>+</Text>
      //                     </TouchableOpacity>
      //                   </View>
      //                 ))
      //               ) : (
      //                 <TouchableOpacity onPress={() => arrayHelpers.push('')}>
      //                   {/* show this when user has removed all friends from the list */}
      //                   <Text>Add a friend</Text>
      //                 </TouchableOpacity>
      //               )}
      //               <View>
      //                 <TouchableOpacity type="submit">
      //                   <Text>Submit</Text>
      //                 </TouchableOpacity>
      //               </View>
      //             </View>
      //           )}
      //         />
      //       </View>
      //     )}
      //   </Formik>
      // </View>

    <ScrollView style={{ margin: '2%' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ handlePush, handleRemove, handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            <Field name="name">
              {({ field }) => (
                <View>
                  <Text>Program name: </Text>
                  <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    onChangeText={field.onChange(field.name)}
                    onBlur={field.onBlur(field.name)}
                    value={field.value}
                  />
                </View>
              )}
            </Field>
            <Field name="weeks">
              {({ field }) => (
                <View>
                  <Text>Weeks: {JSON.stringify(values.weekDetails.length)}</Text>
                  <TextInput
                    style={{ borderWidth: 1, padding: 5 }}
                    onChangeText={field.onChange(field.name)}
                    onBlur={field.onBlur(field.name)}
                    value={field.value ? field.value.toString() : ''}
                  />
                </View>
              )}
            </Field>
            <FieldArray
              name="weekDetails"
              render={arrayHelpers => (
                <View>
                  {values.weekDetails && values.weekDetails.length > 0 ? (
                    values.weekDetails.map((week, weekIndex) => (
                      <View key={weekIndex}>
                        <Field name={`weekDetails.${weekIndex}.weekNum`}>
                          {({ field }) => (
                            <View style={{ flexDirection: 'row' }}>
                              <Text>{`weekDetails.${weekIndex}.weekNum`}</Text>
                              <Text>Week Number</Text>
                              <TextInput 
                                style={{
                                  borderWidth: 1
                                }}
                                onChangeText={field.onChange(field.name)}
                                onBlur={field.onBlur(field.name)}
                                value={field.value ? field.value.toString() : ''}
                                keyboardType='numeric'
                                placeholder={`Week ${weekIndex + 1}`}
                              />
                            </View>
                          )}
                        </Field>
                        <Text>weekIndex: {weekIndex}</Text>
                        <Days
                          weekIndex={weekIndex}
                          name={`weekDetails.${weekIndex}.dayDetails`}
                          week={week}
                        />

                        {/*  */}
                        {/* <FieldArray
                          name="dayDetails"
                          render={arrayHelpers => (
                            <View>
                              {week.dayDetails && week.dayDetails.length > 0 ? (
                                <View>
                                  <Text>days are greater than 0</Text>
                                </View>

                              ): (
                                <View>
                                  <Text>days are less than 1</Text>
                                </View>
                              )}
                              <TouchableOpacity onPress={() => arrayHelpers.push(
                                {
                                  name: '', 
                                  dayNum: '', 
                                  exercises: []
                                }
                              )}
                              >
                                <Text>Add a day</Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        >
                        </FieldArray> */}
                        {/*  */}
                        
                        {week.dayDetails && week.dayDetails.length > 0 ? (
                          week.dayDetails.map((day, dayIndex) => (
                            <View key={dayIndex}>

                              {/* <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.dayNum`}>
                                {({ field }) => (
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text>Day number of week: </Text>
                                    <TextInput
                                      style={{
                                        borderWidth: 1
                                      }}
                                      onChangeText={field.onChange(field.name)}
                                      onBlur={field.onBlur(field.name)}
                                      value={field.value ? field.value.toString() : ''}
                                      placeholder={`Day ${dayIndex + 1} Number`}
                                    />
                                  </View>
                                )}
                              </Field> */}


                              {/* <FieldArray
                                name="exercises"
                                render={arrayHelpers => (
                                  <View>
                                    weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.map
                                  </View>
                                )}
                              >

                              </FieldArray> */}



                              {day.exercises && day.exercises.length > 0 ? (
                                day.exercises.map((exercise, exerciseIndex) => (
                                  <View key={exerciseIndex}>
                                    <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.name`}>
                                      {({ field }) => (
                                        <View style={{ flexDirection: 'row' }}>
                                          <Text>Exercise name: </Text>
                                          <TextInput
                                            style={{
                                              borderWidth: 1
                                            }}
                                            onChangeText={field.onChange(field.name)}
                                            onBlur={field.onBlur(field.name)}
                                            value={field.value ? field.value.toString() : ''}
                                            placeholder={`Exercise ${exerciseIndex + 1} Name`}
                                          />
                                        </View>
                                      )}
                                    </Field>
                                    <Text>warmup sets: </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.warmupSets.min`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>min: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} min warmup sets`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                      <Text> - </Text>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.warmupSets.max`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>max: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} max warmup sets`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                    <Text>working sets: </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.workingSets.min`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>min: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} min working sets`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                      <Text> - </Text>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.workingSets.max`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>max: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} max working sets`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                    <Text>reps: </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.reps.min`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>min: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} min reps`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                      <Text> - </Text>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.reps.max`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>max: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} max reps`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.reps.notes`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>notes: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} reps notes`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                    <Text>weight:</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.weight.value`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>value: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} rest value`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                      <Text> - </Text>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.weight.unit`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>unit: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} rest unit`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                    <Text>rpe: </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.rpe.min`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>min: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} min rpe`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                      <Text> - </Text>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.rpe.max`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>max: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} max rpe`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                    <Text>rest: </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.rest.value`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>value: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} rest value`}
                                              keyboardType='numeric'
                                            />
                                            
                                          </View>
                                        )}
                                      </Field>
                                      <Text> - </Text>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.rest.unit`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>unit: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} rest unit`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                    <Text>notes: </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Field name={`weekDetails.${weekIndex}.dayDetails.${dayIndex}.exercises.${exerciseIndex}.notes`}>
                                        {({ field }) => (
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text>value: </Text>
                                            <TextInput
                                              style={{
                                                borderWidth: 1
                                              }}
                                              onChangeText={field.onChange(field.name)}
                                              onBlur={field.onBlur(field.name)}
                                              value={field.value ? field.value.toString() : ''}
                                              placeholder={`Exercise ${exerciseIndex + 1} notes`}
                                            />
                                          </View>
                                        )}
                                      </Field>
                                    </View>
                                  </View>
                                ))
                              ) : (
                                <View></View>
                              )}
                            </View>
                          ))
                        ) : (
                          <View></View>
                        )}

                        <TouchableOpacity
                          onPress={() => arrayHelpers.remove(weekIndex)}
                          style={{
                            backgroundColor: 'red',
                            borderRadius: 5,
                            padding: 10,
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: 'bold'}}>Remove week</Text>
                        </TouchableOpacity>
                      </View>
                    ))
                  ) : (
                    <Text>No weeks</Text>
                  )}
                  <View>
                    <TouchableOpacity 
                    onPress={() => arrayHelpers.push(
                      { 
                        weekNum: values.weekDetails.length + 1,
                        dayDetails: [
                          // {
                          //   name: '', 
                          //   dayNum: '', 
                          //   exercises: [
                          //     {
                          //       name: '',
                          //       warmupSets: {
                          //         min: '',
                          //         max: '',
                          //       },
                          //       workingSets: {
                          //         min: '',
                          //         max: '',
                          //       },
                          //       reps: {
                          //         min: '',
                          //         max: '',
                          //         notes: '',
                          //       },
                          //       weight: {
                          //         value: '',
                          //         unit: '',
                          //       },
                          //       rpe: {
                          //         min: '',
                          //         max: '',
                          //       },
                          //       rest: {
                          //         value: '',
                          //         unit: ''
                          //       },
                          //       notes: ''
                          //     },
                          //   ]
                          // }
                        ]
                      }
                    )}
                    style={{
                      backgroundColor: 'purple',
                      borderRadius: 5,
                      padding: 10,
                      alignItems: 'center'
                    }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold'}}>Add a week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
                      <Text>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {values.weekDetails && values.weekDetails.length > 0 ? (
              <View>
                <Text>Weeks greater than 0. Amt of weeks: {JSON.stringify(values.weekDetails.length)}</Text>
                <Text>{(JSON.stringify(values, null, 2))}</Text>


                {/* <Text>{JSON.stringify(values.weekDetails.dayDetails.dayNum)}</Text> */}
                {/* {values.weekDetails.dayDetails.map((day) => {
                  <Text>{JSON.stringify(day.dayNum)}</Text>
                })} */}

                {/* {values.weekDetails.map((week) => {
                  {alert(JSON.stringify(week.dayDetails))}
                })} */}
              </View>
            ) : (
              <View>
                <Text>Weeks less than 0</Text>
              </View>
            )}
            <Text>{(JSON.stringify(wantedValues, null, 2))}</Text>
            {/* {values.initialValues.weekDetails.map((week, index) =>(
              <View key={index}>

              </View>
            ))} */}
          </View>
        )}
      </Formik>
    </ScrollView>

    // <View>
    //   <Formik
    //     initialValues={{ email: '', password: ''}}
    //     validate={values => {
    //       const errors = {}
    //       if (!values.email) {
    //         errors.email = 'Required'
    //       } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    //         errors.email = 'Invalid email address'
    //       }

    //       if (!values.password) {
    //         errors.password = 'Required'
    //       }
    //       return errors
    //     }}
    //     onSubmit={(values, { setSubmitting }) => {
    //       setTimeout(() => {
    //         alert(JSON.stringify(values, null, 2))
    //         setSubmitting(false)
    //       }, 400)
    //     }}
    //   >
    //     {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
    //       <View>
    //         <TextInput
    //           placeholder="Email"
    //           onChangeText={handleChange('email')}
    //           onBlur={handleBlur('email')}
    //           value={values.email}    
    //         />
    //         {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
    //         <TextInput
    //           placeholder="Password"
    //           secureTextEntry
    //           onChangeText={handleChange('password')}
    //           onBlur={handleBlur('password')}
    //           value={values.password}
    //         />
    //         {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
    //         <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
    //           <Text style={{ backgroundColor: isSubmitting ? '#ccc' : '#007AFF', color: '#fff', padding: 10, textAlign: 'center' }}>Submit</Text>
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //   </Formik>
    //   <Text>What is the name of your workout program?</Text>
    //   <Formik
    //     initialValues={initialValues}
    //     onSubmit={async (values) => {
    //       await new Promise((r) => setTimeout(r, 500))
    //       alert(JSON.stringify(values, null, 2))
    //     }}
    //   >
    //     {/* TODO: ADD WORKOUT FORM INFO */}
    //     {({ values }) => (
    //       <Form>
    //         <FieldArray name="weekDetails">
    //           {({ insert, remove, push }) => (
    //             <View>

    //             </View>
    //           )}
    //         </FieldArray>
    //       </Form>
    //     )}

    //   </Formik>
    //   <TextInput 
    //     placeholder="Workout program name"
    //     value={programName}
    //     onChangeText={(text) => setProgramName(text)}
    //   />
    //   <Button 
    //     title="Add Week"
    //     onPress={() => navigation.navigate('AddWeeks')}
    //   />
    //   <Button 
    //     title="Save"
    //     onPress={() => handleSaveProgram()}
    //     disabled={!programName}
    //   />
    // </View>
  )
}

export function AddWeeksScreen({ navigation, route }) {
  const { newProgram } = route.params
  const [weeks, setWeeks] = useState([])
  const [program, setProgram] = useState(null)

  const handleNewWeek = () => {
    const newWeek = { weekNum: weeks.length + 1, dayDetails: [] }
    setWeeks([...weeks, newWeek])
  }

  const handleUpdateProgram = async () => {
    const updatedProgram = await programsService.updateProgram(newProgram._id, { weeks: weeks.length, weekDetails: weeks })
    console.log('/// inside AddWeeksScreen/handleUpdateProgram ///')
    console.log(updatedProgram)
    console.log('/// inside AddWeeksScreen/handleUpdateProgram ///')
    setProgram(updatedProgram)
  }

  const handleWeekPress = (week) => {
    navigation.navigate('AddDays', { program, week, handleDaysUpdate })
  }

  const handleDaysUpdate = (updatedDays, weekNum) => {

    const updatedWeeks = weeks.map((week) => {
      if (week.weekNum === weekNum) {
        return { ...week, dayDetails: updatedDays }
      }
      return week
    })
    console.log('---- \t \t updated weeks')
    console.log(updatedWeeks)

    // weeks[weekNum - 1].dayDetails = updatedDays

    // updatedWeeks[weekNum - 1].dayDetails = updatedDays
    // const updatedWeeks = weeks.map((week) => {
    //   if (week.weekNum === weekNum) {
    //     return { ...week, dayDetails: updatedDays}
    //   }
    //   return week
    // })
    setWeeks(updatedWeeks)
  }

  useEffect(() => {
    console.log('---- weeks ----')
    console.log(weeks[0])
    console.log('---- weeks ----')
    if (program) {
      handleUpdateProgram()
    }
  }, [weeks])

  return (
    <View>
      <Button 
        title={`Add new week to ${newProgram.name}`}
        onPress={handleNewWeek}
      />
      {weeks.map((week) => (
        <TouchableOpacity key={week.weekNum} onPress={() => handleWeekPress(week)}>
          <Text>Week {week.weekNum}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
export function AddDaysScreen({ navigation, route }) {
  const { program, week, handleDaysUpdate } = route.params
  const [days, setDays] = useState([])

  
  const handleNewDay = () => {
    if (days.length >= 7) {
      return
    }
    const newDay = { dayNum: days.length + 1, exercises: [] }
    setDays([...days, newDay])
  }
  
  
  
  useEffect(() => {
    console.log('---- days ----')
    console.log(days)
    console.log('---- days ----')
    // handleUpdateProgram function should be called after handleDaysUpdate to ensure that weeks is updated before updatedProgram is updated in the database
    handleDaysUpdate(days, week.weekNum)
  }, [days])

  const handleUpdateProgram = async () => {
    // TODO: update dayDetails for the certain week
    try {
      const updatedProgram = { ...program }
      const weekIndex = week.weekNum - 1
      console.log(`**** **** week index ${weekIndex}`)

      console.log("---- updatedProgram ------")
      console.log(updatedProgram)
      console.log("------ \t before ------")
      console.log(updatedProgram.weekDetails[weekIndex].dayDetails)
      updatedProgram.weekDetails[weekIndex].dayDetails = days
      console.log("------ \t after ------")
      console.log(updatedProgram.weekDetails[weekIndex].dayDetails)
      console.log("---- updatedProgram ------")
      await programsService.updateProgram(program._id, updatedProgram)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDayPress = (day) => {
    navigation.navigate('DayDetails', { day })
  }

  const handleSavePress = () => {
    handleUpdateProgram()
  }

  return (
    <View>
      <Button 
        // title={`Add new day for week ${week.weekNum} of ${newProgram.name}`}
        title={`Add new day`}
        onPress={() => handleNewDay()}
      />
      {days.map((day) => (
        <TouchableOpacity key={day.dayNum} onPress={() => handleDayPress(day)}>
          <Text>Day {day.dayNum}</Text>
        </TouchableOpacity>
      ))}
      <Button 
        title='Save'
        onPress={handleSavePress}
      />
    </View>
  )
}

export function WeeksSelectableScreen({ navigation, route }) {
  const { programName, weeks } = route.params

  const handleWeekPress = (weekNum) => {
    navigation.navigate('WeekDetails', { programName, weekNum })
  }

  const handleFinishLater = () => {
    navigation.reset({
      index: 0,
      routes: [{
        name: 'Home'
      }]
    })
  }

  return (
    <View>
      <Text>Select a week to add information to.</Text>
      {Array.from({ length: weeks}, (_, index) => index + 1).map((weekNum) => (
        <TouchableOpacity key={weekNum} onPress={() => handleWeekPress(weekNum)}>
          <Text>Week {weekNum}</Text>
        </TouchableOpacity>
      ))}
      <Button 
        title="Finish Later"
        onPress={handleFinishLater}
      />
    </View>
  )
}

export function DayDetailsScreen({ route }) {
  const [modalVisible, setModalVisible] = useState(false)

  const [exercises, setExercises] = useState([])

  const [exerciseName, setExerciseName] = useState('')
  const [workingSets, setWorkingSets] = useState('')
  const [reps, setReps] = useState('')

  const { weekNum, dayNum } = route.params

  const handleAddExercise = () => {
    if (exerciseName && workingSets && reps) {
      setExercises(
        [
          ...exercises,
          {
            name: exerciseName,
            sets: workingSets,
            reps: reps,
          }
        ]
      )
      setExerciseName('')
      setWorkingSets('')
      setReps('')
    }

    console.log('Add exercise', exerciseName, workingSets, reps)
    setModalVisible(false)
  }

  return (
    <View>
      <Text>Week {weekNum}, Day {dayNum} Details</Text>
      {exercises.map((exercise, index) => (
        <View key={index}>
          <Text>{exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Reps: {exercise.reps}</Text>
        </View>
      ))}
      <Button title="Add Exercise" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="fade">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Add exercise</Text>
          <TextInput 
            placeholder="Exercise name"
            value={exerciseName}
            onChangeText={setExerciseName}
          />
          <TextInput 
            placeholder="Working sets"
            value={workingSets}
            onChangeText={setWorkingSets}
          />
          <TextInput
            placeholder="Reps"
            value={reps}
            onChangeText={setReps}
          />
          <Button 
            title="Add"
            onPress={handleAddExercise}
          />
          <Button 
            title="Cancel"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  )
}

export function ProgramDetailsScreen({ route }) {
  const { programName, weeks } = route.params

  return (
    <View>
      <Text>Workout Program Details:</Text>
      <Text>Workout Program Name: {programName}</Text>
      <Text>Duration: {weeks} Weeks</Text>
    </View>
  )
}