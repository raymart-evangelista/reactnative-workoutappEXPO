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

const CreateProgramScreen2 = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            programName: "My 8 Week Workout Program",
        },
    })
    const onSubmit = (data) => console.log(data)
    return (
        <SafeAreaView>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Program Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="programName"
            />
            {errors.programName && <Text>This is required</Text>}

            <Button
                onPress={handleSubmit(onSubmit)}
            >
                Submit
            </Button>
        </SafeAreaView>
    );
};

const WorkoutProgramForm = () => {
    const { register, formState: {errors}, control } = useForm({
        defaultValues: {
            cart: [{ name: '', amount: 0 }]
        }
    })

    const { fields } = useFieldArray({
        name: 'cart',
        control
    })

    return (
        <>
            {fields.map((field, index) => {
            })}
        </>
    )
}

const CreateProgramScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            yourInputName: ""
        }
    })
    const onSubmit = (data) => console.log(data)

    return (
        <SafeAreaView>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Sample Input"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="yourInputName"
            />
            {errors.yourInputName && <Text>This field is required.</Text>}
            <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        </SafeAreaView>
    )
}

export default CreateProgramScreen;
