import { useEffect, useState } from "react"
import { Modal, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper'
import * as Yup from 'yup';

import { ExistingProgramsScreen } from "./ExistingProgramScreen";
import { SCREEN_TYPES } from "../../constants/constants"

export function ContinueProgramScreen({ navigation }) {
  return (
    <ExistingProgramsScreen navigation={navigation} screenType={SCREEN_TYPES.CONTINUE} />
  )
}

export function ProgramInformationScreen({ navigation }) {
  return (
    <View>
      <Text>Program information goes here</Text>
    </View>
  )
}