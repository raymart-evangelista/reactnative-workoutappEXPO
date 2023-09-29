import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper';
import * as Yup from 'yup';
import { FlatList } from "react-native";

import TextInput from "../components/TextInput";
import SegmentedButtonWithSelectedCheck from "../components/SegmentedButtonWithSelectedCheck";

import programsService from "../services/programs";

// [data array structure goes here]
const buildDataArray = (program) => {
  let dataArray = [
      {
          type: 'programName',
          props: {
              // props for rendering the program name input or display
          }
      },
      {
          type: 'weeks',
          props: {
              // props for rendering the weeks input or display
          }
      }
  ];

  program.weekDetails.forEach((week, weekIndex) => {
      dataArray.push({
          type: 'weekDetails',
          props: {
              weekNum: week.weekNum,
              // Additional week details if needed
          }
      });

      week.dayDetails.forEach((day, dayIndex) => {
          dataArray.push({
              type: 'dayDetails',
              props: {
                  name: day.name,
                  dayNum: day.dayNum,
                  // Additional day details if needed
              }
          });

          day.exercises.forEach((exercise, exerciseIndex) => {
              dataArray.push({
                  type: 'exercise',
                  props: {
                      name: exercise.name,
                      warmupSets: exercise.warmupSets,
                      workingSets: exercise.workingSets,
                      reps: exercise.reps,
                      weight: exercise.weight,
                      rpe: exercise.rpe,
                      rest: exercise.rest,
                      notes: exercise.notes,
                      warmupSetsCompletion: exercise.warmupSetsCompletion,
                      workingSetsCompletion: exercise.workingSetsCompletion,
                      // Additional exercise details if needed
                  }
              });
          });
      });
  });

  return dataArray;
};

const data = buildDataArray(program);



// Assuming that Days and Weeks are the primary content, 
// we can structure them as renderItem for the FlatList
const RenderItem = ({ item }) => {
    // Depending on the item type, you can conditionally render Days or Weeks or other components
    if (item.type === 'programName') {
        return <TextInput {...item.props} />;
    } else if (item.type === 'weeks') {
        // Render your Weeks input or display component
    } else if (item.type === 'weekDetails') {
        return <Days {...item.props} />;
    } else if (item.type === 'dayDetails') {
        return <Weeks {...item.props} />;
    } else if (item.type === 'exercise') {
        // Render your Exercise component
    }
    return null;
};

const CreateProgramScreen = () => {
    // ... [your state and effect hooks]

    return (
        <FlatList
            data={data}
            renderItem={RenderItem}
            keyExtractor={(item, index) => index.toString()}
            // Add header and footer components if needed
            // ListHeaderComponent={}
            // ListFooterComponent={}
        />
    );
};

export default CreateProgramScreen;
