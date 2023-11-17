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

import Animated from "react-native-reanimated";

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
        <Animated.View
            style={{
                width: 100,
                height: 100,
                backgroundColor: 'violet',
            }}
        />
    )
}

export default CreateProgramScreen;
