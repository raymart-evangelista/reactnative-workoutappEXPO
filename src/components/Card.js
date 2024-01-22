import { View } from 'react-native'
import { Avatar, Card, Text, Button } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const LeftContent = (props) => <Avatar.Icon {...props } icon="folder" />

{/* 
  the title will be the Week number
  the content will be the day names and exercises
*/}


export const WeekCard = ({ title, content, onRemove, onEdit }) => {
  return (
    <Card style={styles.container}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium" className="italic">{content}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button icon="trash-can-outline" onPress={onRemove}>Remove</Button>
        <Button icon="pencil-outline" onPress={onEdit}>Edit</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
})