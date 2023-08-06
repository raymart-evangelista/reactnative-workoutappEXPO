import { useState } from "react";
import { View } from "react-native";
import { Text, Button, RadioButton } from "react-native-paper";

const SetTracker = ({ sets, type, onSetCompletion }) => {

  // Local state to manage which radio buttons are checked
  const [completedSets, setCompletedSets] = useState(new Array(parseInt(sets)).fill(false))
  // console.log(completedSets)

  // const [setsCompletion, setSetsCompletion] = useState(new Array(sets).fill(false))

  // const handleSetCompletion = (setIndex, completionStatus) => {
  //   const updatedCompletion = [...setsCompletion]
  //   updatedCompletion[setIndex] = completionStatus
  //   setSetsCompletion(updatedCompletion)

  //   onSetCompletion(type, setIndex, completionStatus)
  // }

  const handleRadioPress = (index) => {
    const updatedCompletedSets = [...completedSets]
    updatedCompletedSets[index] = !updatedCompletedSets[index] // toggle completion state (check/uncheck)
    setCompletedSets(updatedCompletedSets)

    // Callback to parent component
    onSetCompletion(type, index, updatedCompletion[index])
  }

  return (
    <View>
      <Text>{`Completed ${completedSets.filter(Boolean).length} of ${sets} ${type} sets`}</Text>
      {/* {completedSets.map((completed, index) => ( */}
      { completedSets.map((isSetCompleted, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton.IOS
            value={`set-${index}`}
            mode='ios'
            status={isSetCompleted ? "checked" : "unchecked"}
            onPress={() => handleRadioPress(index)} // Toggle completion status
          />
          <Text>{`Set ${index + 1}`}</Text>
        </View>
      ))}
    </View>
  )
}

export default SetTracker