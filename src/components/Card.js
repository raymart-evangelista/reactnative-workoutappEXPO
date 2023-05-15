import * as React from 'react'

import { Avatar, Button, Card as PaperCard, Text } from 'react-native-paper'

const LeftComponent = props => <Avatar.Icon {...props} icon="folder" />

const Card = ({title="Default Title", subtitle="Default Subtitle"}) => {
  return (
    <PaperCard>
      {/* <PaperCard.Title title="Card Title" subtitle="Card Subtitle" left={LeftComponent} /> */}
      <PaperCard.Title title={title} subtitle={subtitle} />
      <PaperCard.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </PaperCard.Content>
      {/* <PaperCard.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <PaperCard.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </PaperCard.Actions>
    </PaperCard>
  )
}

export default Card