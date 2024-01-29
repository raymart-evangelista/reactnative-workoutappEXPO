import { Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import SetTracker from "./SetTracker";
// import useWarmupSetsCompletionIndividual from '../hooks/useSetsCompletionIndividual'
import useSetsCompletionIndividual from "../hooks/useSetsCompletionIndividual";

const ExerciseDetails = ({
  program,
  week,
  day,
  exercise,
  weightValue,
  handleWeightChange,
}) => {
  const [warmupSetsCompletionIndividual, setWarmupSetsCompletionIndividual] =
    useSetsCompletionIndividual(
      "warmup",
      exercise.warmupSetsCompletion.individual,
      program,
      week,
      day,
      exercise,
    );
  const [workingSetsCompletionIndividual, setWorkingSetsCompletionIndividual] =
    useSetsCompletionIndividual(
      "working",
      exercise.workingSetsCompletion.individual,
      program,
      week,
      day,
      exercise,
    );

  const formatSetString = (min, max) => {
    return min === max ? min : `${min}-${max}`;
  };

  return (
    <>
      <Text variant="bodySmall">Exercise notes: {exercise.notes}</Text>
      <Text variant="bodyMedium">
        warm-up sets:{" "}
        {formatSetString(exercise.warmupSets.min, exercise.warmupSets.max)}
      </Text>
      <SetTracker
        setsAmount={exercise.warmupSets.max}
        setType="warmup"
        setsCompletionIndividual={warmupSetsCompletionIndividual}
        handleSetsCompletionIndividualChange={setWarmupSetsCompletionIndividual}
      />
      <Text variant="bodyMedium">
        working sets:{" "}
        {formatSetString(exercise.workingSets.min, exercise.workingSets.max)}
      </Text>
      <SetTracker
        setsAmount={exercise.workingSets.max}
        setType="working"
        setsCompletionIndividual={workingSetsCompletionIndividual}
        handleSetsCompletionIndividualChange={
          setWorkingSetsCompletionIndividual
        }
      />
      {exercise.reps.notes ? (
        <Text variant="bodySmall">
          Exercise reps notes: {exercise.reps.notes}
        </Text>
      ) : null}
      <TextInput
        label={`weight (${exercise.weight.unit})`}
        value={`${weightValue}`}
        onChangeText={handleWeightChange}
        keyboardType="numeric"
        style={{ marginTop: 16 }}
      />
    </>
  );
};

export default ExerciseDetails;
