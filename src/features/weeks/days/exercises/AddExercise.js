import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatedFAB } from "react-native-paper";
import { exerciseAdded } from "../../../weeksSlice";
import { nanoid } from "@reduxjs/toolkit";
import { StyleSheet } from "react-native";

export const AddExercise = ({ weekId, dayId }) => {
  const dispatch = useDispatch()

  const onAddExerciseClicked = () => {
    dispatch(
      exerciseAdded({
        weekId,
        dayId,
        exercise: {
          id: nanoid(),
        }
      })
    )
  }

  return (
    <AnimatedFAB
      icon='plus'
      label='Add Exercise'
      onPress={onAddExerciseClicked}
      animateFrom="right"
      iconMode='dynamic'
      style={[styles.fabStyle]}
      extended='true'
    />
  )
}

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute'
  },
})