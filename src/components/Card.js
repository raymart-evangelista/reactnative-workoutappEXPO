import * as React from 'react'
import { Avatar, Card, Text, Button } from 'react-native-paper'

const LeftContent = (props) => <Avatar.Icon {...props } icon="folder" />

export const WeekCard = ({ title, content, }) => {
  return (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
      <Button icon="trash-can-outline">Remove</Button>
      <Button icon="pencil-outline">Edit</Button>
    </Card.Actions>
  </Card>
  )
}