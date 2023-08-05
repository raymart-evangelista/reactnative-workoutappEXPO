import { useState } from "react";
import { View } from "react-native";
import { Text, Button, RadioButton } from "react-native-paper";

const SetTracker = ({ sets, type, onSetCompletion }) => {
  // const [completedSets, setCompletedSets] = useState(new Array(parseInt(sets)).fill(false))
  // console.log(completedSets)

  const [setsCompletion, setSetsCompletion] = useState(new Array(sets).fill(false))

  const handleSetCompletion = (setIndex, completionStatus) => {
    const updatedCompletion = [...setsCompletion]
    updatedCompletion[setIndex] = completionStatus
    setSetsCompletion(updatedCompletion)

    onSetCompletion(type, setIndex, completionStatus)
  }

  const handleRadioPress = (index) => {
    const updatedCompletedSets = [...completedSets]
    updatedCompletedSets[index] = !updatedCompletedSets[index]
    setCompletedSets(updatedCompletedSets)
  }

  return (
    <View>
      <Text>{`Completed ${completedSets.filter(Boolean).length} of ${sets} ${type} sets`}</Text>
      {/* {completedSets.map((completed, index) => ( */}
      { setsCompletion.map((completed, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton.IOS
            value={`set-${index}`}
            mode='ios'
            status={completed ? "checked" : "unchecked"}
            onPress={() => handleSetCompletion(index, !completed)} // Toggle completion status
          />
          <Text>{`Set ${index + 1}`}</Text>
        </View>
      ))}
    </View>
  )
}

export default SetTracker