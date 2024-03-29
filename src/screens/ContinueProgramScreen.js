import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import {
  Button,
  Text,
  Title,
  RadioButton,
  List,
  useTheme,
} from "react-native-paper";
import * as Yup from "yup";

import Card from "../components/CardDepricated";

import programsService from "../services/programs";
import { useFocusEffect } from "@react-navigation/native";

import useExerciseWeight from "../hooks/useExerciseWeight";

export function ContinueDayScreen({ navigation, route }) {
  const { program, week, day } = route.params;

  console.log("inside ContinueDayScreen for updatedAt");
  console.log(program.updatedAt);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `W${week.weekNum}, D${day.dayNum} of ${program.name}`,
    });
  }, [navigation, day]);

  console.log(route.params.day);

  const windowHeight = Dimensions.get("window").height;
  const desiredSpacing = windowHeight * 0.075;

  return (
    <ScrollView
      style={{
        padding: "2%",
        paddingTop: desiredSpacing,
        paddingBottom: desiredSpacing,
      }}
    >
      {day.exercises.map((exercise) => {
        const [weightValue, setWeightValue] = useExerciseWeight(
          exercise.weight.value,
          program,
          week,
          day,
          exercise,
        );
        return (
          <View key={exercise._id}>
            <Card
              program={program}
              week={week}
              day={day}
              exercise={exercise}
              weightValue={weightValue}
              onWeightChange={setWeightValue}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

export function ContinueWeekScreen({ navigation, route }) {
  const { program, week } = route.params;
  const [fetchedProgram, setFetchedProgram] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: `Week ${week.weekNum} of ${program.name}`,
    });
  }, [navigation, program.name, week.weekNum]);

  useFocusEffect(
    useCallback(() => {
      // fetch updated data from server and update screen
      fetchDataAndUpdateState();
      // clean up listener when screen loses focus
      return () => {
        // perform necessary clean up tasks
      };
    }, []),
  );

  const fetchDataAndUpdateState = async () => {
    try {
      const fetchedProgram = await programsService.getProgramById(program.id);
      setFetchedProgram(fetchedProgram);
    } catch (error) {
      console.error("Failed to fetch program:", error);
    }
  };

  const handleDayPress = (day) => {
    // navigate user to day screen that will show exercises
    navigation.navigate("ContinueDay", {
      program: fetchedProgram || program,
      week: week,
      day: day,
    });
  };

  const windowHeight = Dimensions.get("window").height;
  const desiredSpacing = windowHeight * 0.075;

  return (
    <View
      style={{
        padding: "2%",
        paddingTop: desiredSpacing,
        paddingBottom: desiredSpacing,
      }}
    >
      {week.dayDetails.map((day) => (
        <View key={day._id}>
          <TouchableOpacity onPress={() => handleDayPress(day)}>
            <Card title={"Day " + day.dayNum} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export function ProgramInformationScreen({ navigation, route }) {
  // when thee user continues a program, it has the user's state for the programs last continued place of business
  // so if the user already finished week 1 day 1 and nothing else, it will show the user the week 1 day 2 card, along with the cards for the other days in the week
  // when the user clicks on a day, it will show the information they inputted with the only area they can fill in being the desired weight
  // the program should save automatically
  // the program information screen shows the user their current workout day

  // make them into cards
  const { programId } = route.params;
  const [program, setProgram] = useState(null);

  const fetchProgram = async (programId) => {
    try {
      const program = await programsService.getProgramById(programId);
      console.log("this is the FETCHED program");
      console.log(program);
      return program;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch program data from screen component");
    }
  };

  useEffect(() => {
    // fetch information based on program ID
    fetchProgram(programId)
      .then((fetchedProgram) => {
        setProgram(fetchedProgram);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (program) {
      navigation.setOptions({ title: program.name });
    }
  }, [program]);

  const handleWeekPress = (week) => {
    // navigate user to week screen that will show Days
    navigation.navigate("ContinueWeek", {
      program: program,
      week: week,
    });
  };

  const windowHeight = Dimensions.get("window").height;
  const desiredSpacing = windowHeight * 0.075;

  return (
    <ScrollView
      style={{
        padding: "2%",
        paddingTop: desiredSpacing,
        paddingBottom: desiredSpacing,
      }}
    >
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
          {program.weekDetails &&
            program.weekDetails.map((week) => (
              <View key={week._id}>
                <TouchableOpacity onPress={() => handleWeekPress(week)}>
                  <Card title={"Week " + week.weekNum} />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      )}
      {/* <Text>{(JSON.stringify(program, null, 2))}</Text> */}
    </ScrollView>
  );
}
