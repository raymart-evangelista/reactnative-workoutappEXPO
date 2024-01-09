import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Button, Text, Title, RadioButton, List, useTheme } from 'react-native-paper';
import * as Yup from 'yup';
import { FlatList } from "react-native";

// import TextInput from "../components/TextInput";

import { TextInput } from "react-native-paper";
import SegmentedButtonWithSelectedCheck from "../components/SegmentedButtonWithSelectedCheck";

import programsService from "../services/programs";

import { useFieldArray, useWatch, useForm, Controller } from "react-hook-form"

import Animated, { runOnJS, useSharedValue, withSpring, useAnimatedStyle, useAnimatedProps, withTiming, Easing, FadeIn, useDerivedValue } from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";

import uuid from 'react-native-uuid'


const AnimatedBoxHeightValue = 65

const AnimatedBox = ({ index, box, onDelete }) => {

    // const [isExpanded, setIsExpanded] = useState(false)
    const [expandedText, setExpandedText] = useState('Expand')
    console.log('inside AnimatedBox')
    console.log(index)
    console.log('this is the index: ', index) 
    console.log('this is the box: ', box) 
    
    
    const pressed = useSharedValue(false)
    const height = useSharedValue(AnimatedBoxHeightValue)
    const expand = useSharedValue(false)

    const longPressed = useSharedValue(false)

    const calculateNewBoxPosition = (index) => {
        return index * 110
    }

    // const toggleExpand = () => {
    //     setIsExpanded(!isExpanded)
    //     setExpandedText(isExpanded ? 'Expand' : 'Close')
    //     height.value = isExpanded ? AnimatedBoxHeightValue : 200
    // }

    const tap = Gesture.Tap()
        .onEnd(() => {
            console.log(box.index)
            pressed.value = !pressed.value
        })
        
    // const longPress = Gesture.LongPress().minDuration(1000)
    //     .onBegin(() => {
            
    //     })
    //     .onStart(() => {
    //         console.log('after minDuration')
    //         pressed.value = true
    //     })
    //     .onEnd(() => {
    //         console.log(`long pressed`)

    //     })
    //     .onFinalize(() => {
    //         pressed.value = false
    //     })

    const animatedStyle = useAnimatedStyle(() => {
        const y = 0
        console.log(`this is y: ${y}`)
        console.log(`7777`)
        return {
            // height: withTiming(height.value, {
            //     duration: 200,
            // }),
            height: withTiming(pressed.value ? 200 : AnimatedBoxHeightValue, {
                duration: 200,
            }),
            transform: [ 
                {translateY: y}, 
                // {scale: withTiming(pressed.value ? 1.1 : 1)}, 
                // {height: withTiming(pressed.value ? 200 : AnimatedBoxHeightValue )}
            ],
        }
    })

    const animatedContentStyle = useAnimatedStyle(() => {
        return {
            opacity: pressed.value ? 1 : 0,
            height: pressed.value ? 'auto' : 0,
        }
    })
    
    return (
        <GestureDetector gesture={tap}>
            <Animated.View entering={FadeIn} style={[ styles.weekBox, animatedStyle ]}>
                <View style={styles.header}>
                    <Text>Week {box.index + 1}</Text>
                    {/* <Button onPress={toggleExpand}>{expandedText}</Button> */}
                </View>
                <Animated.View style={[ animatedContentStyle ]}>
                    <Text>Test</Text>
                    <Button onPress={onDelete}>Delete</Button>
                </Animated.View>
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

    const generateUniqueId = () => {
        return uuid.v4()
    }

    const handleRemoveWeek = (boxToRemove) => {
        const idToRemove = boxToRemove.id
        console.log('this is the id to remove')
        console.log(idToRemove)

        setBoxes((currentBoxes) => currentBoxes.filter((box, index) => box.id !== idToRemove))
    }

    const handleAddWeek = () => {
        const newBoxIndex = boxes.length
        setBoxes(prevBoxes => [...prevBoxes, {
            index: newBoxIndex,
            id: generateUniqueId(),
        }])
        console.log(boxes)
    }

    const calculateNewBoxPosition = (index) => {
        return index * 110
    }

    const [boxes, setBoxes] = useState([{
        index: 0,
        id: generateUniqueId(),
    }])
 

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
            <ScrollView>
                <Button onPress={handleAddWeek}>Add Week</Button>
                {boxes.map((box, index) => (
                    <AnimatedBox 
                        key={box.id}
                        index={index}
                        box={box}
                        onDelete={() => handleRemoveWeek(box)}
                    />
                ))}
            </ScrollView>

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
        height: AnimatedBoxHeightValue,
        width: '90%',
        // alignSelf: 'center',
        // flexDirection: 'row',

        alignItems: 'center',
        // justifyContent: 'left',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: '5%',
        paddingVertical: 15,
        overflow: 'hidden',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        margin: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    expandedContent: {

    },
  });

export default CreateProgramScreen;
