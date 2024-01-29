import { useState } from "react";
import { useDispatch } from "react-redux";
import { AnimatedFAB, Button } from "react-native-paper";
import { dayAdded } from "../../weeksSlice";
import { nanoid } from "@reduxjs/toolkit";
import { StyleSheet } from "react-native";

export const AddDay = ({ weekId }) => {
  const [title, setTitle] = useState("untitled day");
  const [description, setDescription] = useState("default day description");

  const dispatch = useDispatch();

  const onAddDayClicked = () => {
    dispatch(
      dayAdded({
        weekId,
        day: {
          id: nanoid(),
          title,
          description,
          exercises: [
            {
              id: nanoid(),
            },
          ],
        },
      }),
    );
  };

  return (
    <AnimatedFAB
      icon="plus"
      label="Add Day"
      onPress={onAddDayClicked}
      animateFrom="right"
      iconMode="dynamic"
      style={[styles.fabStyle]}
      extended="true"
    />
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
