import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, SegmentedButtons } from 'react-native-paper';

const SegmentedButtonWithSelectedCheck = () => {
  const [value, setValue] = useState('');

  return (
    // <List.Section title={`Segmented Button - show selected check`}>
      <SegmentedButtons
        onValueChange={setValue}
        value={value}
        style={styles.group}
        buttons={[
          {
            icon: 'weight-pound',
            value: 'pounds',
            label: 'pounds',
            showSelectedCheck: true,
            style: styles.button,
          },
          {
            icon: 'weight-kilogram',
            value: 'kilograms',
            label: 'kilograms',
            showSelectedCheck: true,
            style: styles.button,
          },
        ]}
      />
    // </List.Section>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  group: { paddingHorizontal: 20, justifyContent: 'center' },
});

export default SegmentedButtonWithSelectedCheck;
