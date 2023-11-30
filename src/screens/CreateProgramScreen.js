import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Formik, Field, FieldArray, ErrorMessage, useFormik, useField } from "formik";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper';
import * as Yup from 'yup';
import { FlatList } from "react-native";

// import TextInput from "../components/TextInput";

import { TextInput } from "react-native-paper";
import SegmentedButtonWithSelectedCheck from "../components/SegmentedButtonWithSelectedCheck";

import programsService from "../services/programs";

import { useFieldArray, useWatch, useForm, Controller } from "react-hook-form"

import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedProps, withTiming } from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const CreateProgramScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            programName: "",
            weeks: []
        }
    })

    const onSubmit = (data) => console.log(data)

    const { fields: weekFields, append: appendWeek } = useFieldArray({
        control,
        name: "weeks"
    })

    const width = useSharedValue(100)
    const handlePress = () => {
        width.value = withSpring(width.value + 50)
    }
    const handlePress2 = () => {
        width.value = withSpring(width.value - 50)
    }

    const translateX = useSharedValue(0)

    const handlePress3 = () => {
        translateX.value += 50
    }
    const handlePress4 = () => {
        translateX.value -= 50
    }

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 2) }],
    }))
    // const backgroundColor = useSharedValue("blue")

    const r = useSharedValue(20)

    const handlePress5 = () => {
        r.value += 10
    }

    const handlePress6 = () => {
        r.value = 10
    }

    const animatedProps = useAnimatedProps(() => ({
        r: withTiming(r.value)
    }))
    return (
        // <SafeAreaView>
        //     <Controller
        //         control={control}
        //         rules={{ required: true }}
        //         render={({ field: { onChange, onBlur, value } }) => (
        //             <TextInput
        //                 placeholder="Program Name"
        //                 onBlur={onBlur}
        //                 onChangeText={onChange}
        //                 value={value}
        //             />
        //         )}
        //         name="programName"
        //     />
        //     {errors.programName && <Text>Program name is needed.</Text>}
        //     {/* button to add weeks */}
        //     <Button onPress={() => appendWeek({ days: []})}>Add Week</Button>
        //     {weekFields.map((week, weekIndex) => (
        //         <TouchableOpacity key={week.id} onPress={() => {/* navigate to day screen */}}>
        //         <Text>Week {weekIndex + 1}</Text>
        //         </TouchableOpacity>
        //         ))}
        //     <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        // </SafeAreaView>
        // <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        //     <Animated.View
        //         style={{
        //             width,
        //             height: 100,
        //             backgroundColor: "red",
        //         }}
        //     />
        //     <Button onPress={handlePress}>Click me</Button>
        //     <Button onPress={handlePress2}>Click me</Button>
        //     <Animated.View style={[styles.box, animatedStyles]} />
        //     <View style={styles.container}>
        //         <Button onPress={handlePress3}>Click me</Button>
        //         <Button onPress={handlePress4}>Click me</Button>
        //     </View>
        // </SafeAreaView>

            <View style={styles.container}>
                <Svg style={styles.svg}>
                    <AnimatedCircle cx="50%" cy="50%" fill="#b58df1" animatedProps={animatedProps} />
                </Svg>
                <Button onPress={handlePress5}>Click 5</Button>
                <Button onPress={handlePress6}>Click 6</Button>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      height: 120,
      width: 120,
      backgroundColor: '#b58df1',
      borderRadius: 20,
      marginVertical: 50,
    },
    svg: {
        height: 250,
        width: '100%',
    }
  });

export default CreateProgramScreen;
