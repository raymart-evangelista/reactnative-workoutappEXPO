import { useEffect, useState } from "react"
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper'
import * as Yup from 'yup';

import programsService from "../services/programs";

export function ProgramInformationScreen({ navigation, route }) {

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

  return (
    <ScrollView>
      <Text>Program information goes here</Text>
      <Text>{(JSON.stringify(program, null, 2))}</Text>
    </ScrollView>
  )
}