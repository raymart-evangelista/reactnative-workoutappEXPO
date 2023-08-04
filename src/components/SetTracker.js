import { useState } from "react";
import { View } from "react-native";
import { Text, Button, RadioButton } from "react-native-paper";

const SetTracker = ({ sets, type }) => {
  const [completedSets, setCompletedSets] = useState(new Array(parseInt(sets)).fill(false))
  console.log(completedSets)

  const handleRadioPress = (index) => {
    const updatedCompletedSets = [...completedSets]
    updatedCompletedSets[index] = !updatedCompletedSets[index]
    setCompletedSets(updatedCompletedSets)
  }

  return (
    <View>
      <Text>{`Completed ${completedSets.filter(Boolean).length} of ${sets} ${type} sets`}</Text>
      {completedSets.map((completed, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton.IOS
            value={`set-${index}`}
            mode='ios'
            status={completed ? "checked" : "unchecked"}
            onPress={() => handleRadioPress(index)}
          />
          <Text>{`Set ${index + 1}`}</Text>
        </View>
      ))}
      {/* <Text>{`Completed ${completedSets} of ${sets}`}</Text>
      {Array.from({ length: sets }, (_, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton.Group onValueChange={handleRadioPress} value={completedSets.toString()}>
            <RadioButton value={index.toString()} />
          </RadioButton.Group>
          <Text>{`Set ${index + 1}`}</Text>
      </View>
      ))} */}
    </View>
  )
}

export default SetTracker