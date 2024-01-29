import { useState, useEffect } from "react";
import {
  Button,
  Card as PaperCard,
  Text,
  TextInput,
  RadioButton,
} from "react-native-paper";
import { View } from "react-native";
import programsService from "../services/programs";
import { setIn } from "formik";
import ExerciseDetails from "./ExerciseDetails";

const Card = ({
  title = "Default Title",
  subtitle = null,
  program = null,
  week = null,
  day = null,
  exercise = null,
  weightValue,
  onWeightChange,
}) => {
  return (
    <PaperCard>
      {exercise ? (
        <>
          <PaperCard.Title title={exercise.name} />
          <PaperCard.Content>
            <ExerciseDetails
              program={program}
              week={week}
              day={day}
              exercise={exercise}
              weightValue={weightValue}
              handleWeightChange={onWeightChange}
            />
          </PaperCard.Content>
        </>
      ) : (
        <>
          <PaperCard.Title title={title} subtitle={subtitle} />
          <PaperCard.Content>
            {/* <Text variant="titleLarge">Card title</Text> */}
            {/* <Text variant='bodySmall'>{exercise.notes}</Text> */}
          </PaperCard.Content>
        </>
      )}
      <PaperCard.Actions>
        {/* <Button>Cancel</Button> */}
        {/* <Button>Ok</Button> */}
      </PaperCard.Actions>
    </PaperCard>
  );
};

export default Card;
