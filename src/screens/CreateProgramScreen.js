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

import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

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
    // const backgroundColor = useSharedValue("blue")

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
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View
                style={{
                    width,
                    height: 100,
                    backgroundColor: "red",
                }}
            />
            <Button onPress={handlePress}>Click me</Button>
            <Button onPress={handlePress2}>Click me</Button>
        </View>
    )
}

export default CreateProgramScreen;
