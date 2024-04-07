import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AnimatedFAB, Button } from 'react-native-paper'
import { dayAdded } from '../../../programSlice'
import { nanoid } from '@reduxjs/toolkit'
import { StyleSheet } from 'react-native'
import { useThemedStyles } from '../../../../styles/globalStyles'

export const AddDay = ({ weekId }) => {
  const styles = useThemedStyles()
  const [title, setTitle] = useState('untitled day')
  const [description, setDescription] = useState('default day description')

  const dispatch = useDispatch()

  const onAddDayClicked = () => {
    dispatch(
      dayAdded({
        weekId,
        day: {
          id: nanoid(),
          title,
          description,
          exercises: [],
        },
      })
    )
  }

  return (
    <AnimatedFAB
      icon="plus"
      label="Add Day"
      onPress={onAddDayClicked}
      animateFrom="right"
      iconMode="dynamic"
      style={styles.fabStyle}
      extended="true"
    />
  )
}
