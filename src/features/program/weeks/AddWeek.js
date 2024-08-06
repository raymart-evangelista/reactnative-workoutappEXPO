import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedFAB, Button } from 'react-native-paper'

import { nanoid } from '@reduxjs/toolkit'
import { weekAdded } from '../../programSlice'
import { StyleSheet } from 'react-native'
import { useThemedStyles } from '../../../styles/globalStyles'

export const AddWeek = () => {
  const styles = useThemedStyles()
  const [title, setTitle] = useState('default week title')
  const [description, setDescription] = useState('default week description')

  const dispatch = useDispatch()

  const onAddWeekClicked = () => {
    dispatch(
      weekAdded({
        id: nanoid(),
        title,
        description,
        days: [],
      })
    )
  }

  return (
    <Button icon={'plus'} onPress={onAddWeekClicked}>
      Add Week
    </Button>
  )
}
