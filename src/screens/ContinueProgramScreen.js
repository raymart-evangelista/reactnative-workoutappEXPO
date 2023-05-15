import { useEffect, useState } from "react"
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper'
import * as Yup from 'yup';

import Card from "../components/Card";

import programsService from "../services/programs";

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

  return (
    <ScrollView>
      <Text>Recent programs here</Text>
      <ScrollView horizontal={true}>
        <Text>Program information goes here</Text>
        {program && program.weekDetails && program.weekDetails.map(week => (
            <View key={week._id}>
              <Card title={'Week ' + week.weekNum} subtitle={week._id} />
            </View>
          ))}
      </ScrollView>
      <Card />
      {program && (
        <View>
          <Text>Program exists</Text>
          <Text>{program.id}</Text>
          {program.weekDetails && program.weekDetails.map(week => (
            <View key={week._id}>
              <Card title={'Week ' + week.weekNum} subtitle={week._id} />
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