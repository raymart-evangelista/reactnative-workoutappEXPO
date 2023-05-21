import { useState } from 'react'

import { Avatar, Button, Card as PaperCard, Text, TextInput } from 'react-native-paper'

const LeftComponent = props => <Avatar.Icon {...props} icon="folder" />

const Card = ({title="Default Title", subtitle=null, clickAction=null, exercise=null}) => {

  const [weight, setWeight] = useState(exercise?.weight.value || '')

  const handleWeightChange = value => {
    setWeight(value)
  }

  return (
    <PaperCard>
      {exercise ? (
          <>
            <PaperCard.Title title={exercise.name}/>
            <PaperCard.Content>
              <Text variant='bodySmall'>{exercise.notes}</Text>
              {exercise.warmupSets.min === exercise.warmupSets.max ? (
                <Text variant='bodyMedium'>warm up sets: {exercise.warmupSets.min}</Text>

              ) : (
                <Text variant='bodyMedium'>warm up sets: {exercise.warmupSets.min}-{exercise.warmupSets.max}</Text>
              )}
              {exercise.workingSets.min === exercise.workingSets.max ? (
                <Text variant='bodyMedium'>working sets: {exercise.workingSets.min} x {exercise.reps.min}-{exercise.reps.max} reps {exercise.reps.notes && ` (${exercise.reps.notes})`}</Text>

              ) : (
                <Text variant='bodyMedium'>working sets: {exercise.workingSets.min}-{exercise.workingSets.max} x {exercise.reps.min}-{exercise.reps.max} reps ({exercise.reps.notes})</Text>
              )}
              {exercise.reps.notes ? (
                <>
                <Text variant='bodySmall'></Text>
                </>
              ) : (
                <>
                </>
              )}
              <TextInput
                label='weight'
                value={`${weight}`}
                onChangeText={handleWeightChange}
                keyboardType='numeric'
                style={{ marginTop: 16 }}
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
      {/* <PaperCard.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <PaperCard.Actions>
        {/* <Button>Cancel</Button> */}
        {/* <Button>Ok</Button> */}
      </PaperCard.Actions>
    </PaperCard>
  )
}

export default Card