import { TextInput as PaperTextInput } from 'react-native-paper'

const TextInput = ({ field, label, placeholder, style, multiline = false, numberOfLines = 1, error}) => {

  console.log('this is the error passed in:')
  console.log(error)

  return (
    <PaperTextInput
      mode='outlined'
      label={label}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onChangeText={field.onChange(field.name)}
      onBlur={field.onBlur(field.name)}
      value={field.value ? field.value.toString() : ''}
      placeholder={placeholder}
      error={error}
    />
  )
}

export default TextInput