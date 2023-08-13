import { useState } from "react";
import { View } from "react-native";
import { Text, Button, RadioButton, Checkbox } from "react-native-paper";

const SetTracker = ({ setsAmount, type, onSetCompletion }) => {

  // Local state to manage which radio buttons are checked
  const [completedSets, setCompletedSets] = useState(new Array(parseInt(setsAmount)).fill(false))
  // console.log(completedSets)

  // const [setsCompletion, setSetsCompletion] = useState(new Array(sets).fill(false))

  // const handleSetCompletion = (setIndex, completionStatus) => {
  //   const updatedCompletion = [...setsCompletion]
  //   updatedCompletion[setIndex] = completionStatus
  //   setSetsCompletion(updatedCompletion)

  //   onSetCompletion(type, setIndex, completionStatus)
  // }

  const handleSetCompletion = (index) => {
    console.log(index)
    const updatedCompletion = [...completedSets]
    updatedCompletion[index] = !updatedCompletion[index] // toggle completion state (check/uncheck)
    setCompletedSets(updatedCompletion)

    // Callback to parent component
    // onSetCompletion(type, index, updatedCompletion[index])
  }

  return (
    <View>
      <Text>{`Completed ${completedSets.filter(Boolean).length} of ${setsAmount} ${type} sets`}</Text>
      {/* {completedSets.map((completed, index) => ( */}
      { completedSets.map((isSetCompleted, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox.Android
            status={isSetCompleted ? "checked" : "unchecked"}
            onPress={() => handleSetCompletion(index)}
            uncheckedColor="red"
            color="green"
          />
          <Text>{`Set ${index + 1}`}</Text>
        </View>
      ))}
    </View>
  )
}

export default SetTracker