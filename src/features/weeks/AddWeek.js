import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedFAB } from 'react-native-paper'

import { nanoid } from '@reduxjs/toolkit'
import { weekAdded } from '../weeksSlice'
import { StyleSheet } from 'react-native'
import { useThemedStyles } from '../../styles/globalStyles'

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
        days: [
          {
            id: nanoid(),
            title: 'untitled day',
            description: 'default day description',
            exercises: [],
          },
        ],
      })
    )

    // setTitle()
    // setDescription()
  }

  return (
    <AnimatedFAB
      icon={'plus'}
      label={'Add Week'}
      onPress={onAddWeekClicked}
      animateFrom={'right'}
      iconMode={'dynamic'}
      style={styles.fabStyle}
      extended={'true'}
    />
  )
}
