import { useEffect, useState, useLayoutEffect, useCallback } from "react"
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper'
import * as Yup from 'yup';

import Card from "../components/Card";

import programsService from "../services/programs";
import { useFocusEffect } from "@react-navigation/native";

export function ContinueDayScreen({ navigation, route }) {

  const { program, week, day } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `W${week.weekNum}, D${day.dayNum} of ${program.name}`
    })
  }, [navigation, day])

  console.log(route.params.day)

  return (
    <ScrollView>
      <Text>Hello</Text>
      {day.exercises.map(exercise => (
        <View key={exercise._id}>
          <Card exercise={exercise} program={program} week={week} day={day} />
          {/* 
            ideally want to have it so user can edit weight on the fly
            if the user wants to edit the entire exercise, pull out a modal
           */}
        </View>
      ))}
    </ScrollView>
  )

}

export function ContinueWeekScreen({ navigation, route }) {

  const { program, week } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Week ${week.weekNum} of ${program.name}`
    })
  }, [navigation, week])

  useFocusEffect(
    useCallback(() => {
      // fetch updated data from server and update screen
      
      // clean up listener when screen loses focus
      return () => {
        // perform necessary clean up tasks
      }
    }, [])
  )

  const handleDayPress = (day) => {
    // navigate user to day screen that will show exercises
    navigation.navigate('ContinueDay', {
      program: program,
      week: week,
      day: day
    })
  }

  return (
    <View>
      {week.dayDetails.map(day => (
        <View key={day._id}>
          <TouchableOpacity onPress={() => handleDayPress(day)}>
            <Card title={'Day ' + day.dayNum} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export function ProgramInformationScreen({ navigation, route }) {

  // when thee user continues a program, it has the user's state for the programs last continued place of business
  // so if the user already finished week 1 day 1 and nothing else, it will show the user the week 1 day 2 card, along with the cards for the other days in the week
  // when the user clicks on a day, it will show the information they inputted with the only area they can fill in being the desired weight
  // the program should save automatically
  // the program information screen shows the user their current workout day

  // make them into cards 
  const { programId } = route.params
  const [program, setProgram] = useState(null)

  const fetchProgram = async (programId) => {
    try {
      const program = await programsService.getProgramById(programId)
      console.log('this is the FETCHED program')
      console.log(program)
      return program
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch program data from screen component')
    }
  }

  useEffect(() => {
      // fetch information based on program ID
      fetchProgram(programId)
        .then(fetchedProgram => {
          setProgram(fetchedProgram)
        })
        .catch(error => {
          console.error(error)
        })
  }, [])

  useEffect(() => {
    if (program) {
      navigation.setOptions({ title: program.name })
    }
  }, [program])

  const handleWeekPress = (week) => {
    // navigate user to week screen that will show Days
    navigation.navigate('ContinueWeek', {
      program: program,
      week: week
    })
  }

  return (
    <ScrollView>
      {/* <Text>Recent programs here</Text>
      <ScrollView horizontal={true}>
        {program && program.weekDetails && program.weekDetails.map(week => (
            <View key={week._id}>
              <Card title={'Week ' + week.weekNum} subtitle={week._id} />
            </View>
          ))}
      </ScrollView> */}
      {program && (
        <View>
          <Text>Program exists</Text>
          <Text>{program.id}</Text>
          {program.weekDetails && program.weekDetails.map(week => (
            <View key={week._id}>
              <TouchableOpacity onPress={() => handleWeekPress(week)}>
                <Card title={'Week ' + week.weekNum} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <Text>{(JSON.stringify(program, null, 2))}</Text>
      {/* {program && program.map(weekDetails => (
      ))} */}

    </ScrollView>
  )
}