import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, SegmentedButtons } from 'react-native-paper';

const SegmentedButtonWithSelectedCheck = ({ field, handleChange, valueOptions }) => {
  const buttons = valueOptions.map((option) => ({
    icon: option.icon,
    value: option.value,
    label: option.label,
    showSelectedCheck: option.showSelectedCheck,
    style: styles.button,
  }))

  return (
    // <List.Section title={`Segmented Button - show selected check`}>
      <SegmentedButtons
        onValueChange={handleChange(field.name)}
        value={field.value ? field.value.toString() : ''}
        style={styles.group}
        buttons={buttons}
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
