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

import Animated, { useSharedValue, withSpring, useAnimatedStyle, useAnimatedProps, withTiming, Easing, FadeIn } from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const AnimatedWeekBox = ({ weekNumber, animation }) => {
    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: animation.value,
            transform: [{ scale: animation.value }]
        }
    })

    return (
        <Animated.View style={[ styles.weekBox, animatedStyles ]}>
            <Text>Week {weekNumber}</Text>
        </Animated.View>
    )
}

const AnimatedBox = ({ index, translateY, box }) => {
    console.log('inside AnimatedBox')
    console.log(index)
    console.log('this is the index: ', index) 
    console.log('this is the box: ', box) 

    const pressed = useSharedValue(false)

    const tap = Gesture.Tap()
        .onBegin(() => {
            pressed.value = true
        })
        .onFinalize(() => {
            pressed.value = false
        })

    const animatedStyle = useAnimatedStyle(() => {
        const y = translateY.value[index] || 0
        return {
            transform: [ {translateY: y}, {scale: withTiming(pressed.value ? 1.1 : 1)} ],
        }
    })


    return (
        <GestureDetector gesture={tap}>
            <Animated.View entering={FadeIn} style={[ styles.weekBox, animatedStyle ]}>
                <Text style={styles.text}>Week {box['index'] + 1}</Text>
            </Animated.View>
        </GestureDetector>
    )
}

const CreateProgramScreen = () => {

    // const { control, handleSubmit, formState: { errors } } = useForm({
    //     defaultValues: {
    //         programName: "",
    //         weeks: []
    //     }
    // })

    const onSubmit = (data) => console.log(data)

    // const { fields: weekFields, append: appendWeek } = useFieldArray({
    //     control,
    //     name: "weeks"
    // })

    // Create an array to hold animated values for each week
    // const weekAnimations = weekFields.map(() => useSharedValue(0))

    // Function to append a week and initialize its animation
    // const handleAddWeek = () => {
    //     appendWeek({ days: [] })
    //     appendWeek({ days: [] })
    //     const newWeekAnimation = useSharedValue(0)
    //     newWeekAnimation.value = withTiming(1, { duration: 500 })
    //     weekAnimations.push(newWeekAnimation)
    // }

    const handleAddWeek = () => {
        const newBoxIndex = boxes.length
        console.log('inside handleAddNewBox')
        setBoxes(prevBoxes => [...prevBoxes, {
            index: boxes.length
        }])
        translateYArray.value = [
            ...translateYArray.value,
            withSpring(calculateNewBoxPosition(newBoxIndex))
        ]
        console.log(boxes)
    }

    const calculateNewBoxPosition = (index) => {
        return index * 110
    }

    const [boxes, setBoxes] = useState([{
        index: 0,
    }])
    const translateYArray = useSharedValue([withSpring(calculateNewBoxPosition(0))])

    useEffect(() => {
        translateYArray.value = boxes.map((_, index) => {
            return withSpring(calculateNewBoxPosition(index));
        });
    }, [boxes]);
    

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
        //     <Button onPress={handleAddWeek}>Add Week</Button>
        //     {weekFields.map((week, weekIndex) => (
        //         <TouchableOpacity key={week.id} onPress={() => {/* navigate to day screen */}}>
        //         <Text>Week {weekIndex + 1}</Text>
        //         </TouchableOpacity>
        //         ))}
        //     <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        // </SafeAreaView>
        <SafeAreaView>
            <Button onPress={handleAddWeek}>Add Week</Button>
            {boxes.map((box, index) => (
                <AnimatedBox key={index} translateY={translateYArray} box={box} />
            ))}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
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
    },
    circle: {
        height: 120,
        width: 120,
        borderRadius: 500
    },
    weekBox: {
        height: 50,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: '5%',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        margin: 5,
    }
  });

export default CreateProgramScreen;
