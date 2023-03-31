import { TextInput as PaperTextInput } from 'react-native-paper'

const TextInput = ({field, label, placeholder}) => {
  return (
    <PaperTextInput
      mode='outlined'
      label={label}
      onChangeText={field.onChange(field.name)}
      onBlur={field.onBlur(field.name)}
      value={field.value ? field.value.toString() : ''}
      placeholder={placeholder}
    />
  )
}

export default TextInput