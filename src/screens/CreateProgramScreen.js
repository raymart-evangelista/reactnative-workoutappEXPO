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
import DraggableFlatList, { ScaleDecorator, ShadowDecorator, OpacityDecorator } from 'react-native-draggable-flatlist'

import CollapsibleCard from "../components/CollapsibleCard";


const AnimatedBoxHeightValue = 50
const AnimatedDayBoxClosedWidthValue = 80
const AnimatedDayBoxClosedHeightValue = 80
const AnimatedDayBoxOpenWidthValue = 200

const generateUniqueId = () => {
	return uuid.v4()
}

const AnimatedDayBox = ({ day, onDelete, onDrag, isActive }) => {
	const pressed = useSharedValue(false)

	const tap = Gesture.Tap()
	.onEnd(() => {
		pressed.value = !pressed.value
	})

	handlePress = () => {
		console.log(day.key)
	}

	const animatedStyle = useAnimatedStyle(() => {
		const x = 0
		return {
			width: withTiming(pressed.value ? AnimatedDayBoxOpenWidthValue : AnimatedDayBoxClosedWidthValue, {
				duration: 200,
			}),
			transform: [
				{ translateX: x },
			],
		}
	})

	return (
		<Animated.View 
			entering={FadeIn} 
			style={[styles.dayBox, animatedStyle]}
		>
			<TouchableOpacity
				// style={styles.gestureTapArea}
				onLongPress={onDrag}
				disabled={isActive}
				// onPress={handlePress}
			>
			<GestureDetector gesture={tap}>
						<Text>Day</Text>
			</GestureDetector>
			</TouchableOpacity>
		</Animated.View>
	)
}

const AnimatedWeekBox = ({ index, box, onDelete, onDrag, isActive }) => {
	const [days, setDays] = useState(
		[		
			{
				key: generateUniqueId()
			}
		]
	)

	const dayBoxHeight = 120
	const baseHeight = AnimatedBoxHeightValue
	const totalHeight = baseHeight + (dayBoxHeight * days.length)
	const pressed = useSharedValue(false)
	const height = useSharedValue(AnimatedBoxHeightValue)
	const expand = useSharedValue(false)

	const longPressed = useSharedValue(false)

	const calculateNewBoxPosition = (index) => {
		return index * 110
	}

	const tap = Gesture.Tap()
		.onEnd(() => {
			console.log(box.index)
			pressed.value = !pressed.value
		})

	const animatedStyle = useAnimatedStyle(() => {
		const y = 0
		return {
			// height: withTiming(height.value, {
			//     duration: 200,
			// }),
			height: withTiming(pressed.value ? totalHeight : baseHeight, {
				duration: 200,
			}),
			transform: [
				{ translateY: y },
				// {scale: withTiming(pressed.value ? 1.1 : 1)}, 
				// {height: withTiming(pressed.value ? 200 : AnimatedBoxHeightValue )}
			],
		}
	})

	const animatedContentStyle = useAnimatedStyle(() => {
		return {
			opacity: pressed.value ? 1 : 0,
			height: pressed.value ? 'auto' : 0,
			paddingVertical: 15,
		}
	})

	const handleDelete = () => {
		onDelete()
	}

	const handleAddDay = () => {
		setDays(prevDays => [...prevDays, {
			key: generateUniqueId(),
		}])
	}

	const renderItem = ({ item, drag, isActive }) => {
		return (
			<ScaleDecorator>
				<AnimatedDayBox
					day={item}
					index={item.index}
					// onDelete={() => handleRemoveWeek(item)}
					onDrag={drag}
					isActive={isActive}
				/>
			</ScaleDecorator>
		)
	}

	return (
		<CollapsibleCard headerContent={`Week ${box.index + 1}`} onLongPress={onDrag} disabled={isActive}>
			<Button mode="contained" onPress={handleAddDay}>Add Day</Button>
			<Button mode ="contained" onPress={handleDelete}>Delete</Button>
		</CollapsibleCard>
		// <Animated.View
		// 	// className="border-2 border-rose-600" 
		// 	entering={FadeIn}
		// 	style={[styles.weekBox, animatedStyle]}
		// >
		// 	<GestureDetector gesture={tap}>
				// <TouchableOpacity
				// 	// className="border-2 border-blue-600" 
				// 	style={styles.gestureTapArea}
				// 	onLongPress={onDrag}
				// 	disabled={isActive}
				// >
		// 			<Text>Week {box.index + 1}</Text>
		// 		</TouchableOpacity>
		// 	</GestureDetector>

		// 	<Animated.View style={[animatedContentStyle]}>
		// 		{/* <TouchableOpacity onLongPress={onDrag} disabled={isActive} > */}
					// <Button mode="contained" onPress={handleAddDay}>Add Day</Button>
					// <Button mode ="contained" onPress={handleDelete}>Delete</Button>
    //         <DraggableFlatList
    //             data={days}
    //             onDragEnd={({ data }) => setDays(data)}
    //             keyExtractor={(item) => item.key}
    //             renderItem={renderItem}
    //         />
		// 		{/* </TouchableOpacity> */}
		// 	</Animated.View>
		// </Animated.View>
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



	const handleRemoveWeek = (boxToRemove) => {
		const keyToRemove = boxToRemove.key
		setBoxes((currentBoxes) => currentBoxes.filter((box, index) => box.key !== keyToRemove))
		console.log(`box with key [${keyToRemove}] removed`)
	}

	const handleAddWeek = () => {
		const newBoxIndex = boxes.length
		setBoxes(prevBoxes => [...prevBoxes, {
			key: generateUniqueId(),
			index: newBoxIndex,
		}])
		console.log(boxes)
	}

	const calculateNewBoxPosition = (index) => {
		return index * 110
	}

	const [boxes, setBoxes] = useState(
		[
			{
				key: generateUniqueId(),
				index: 0,
			}
		]
	)

	const renderItem = ({ item, drag, isActive }) => {
		return (
			<ScaleDecorator>
				<AnimatedWeekBox
					box={item}
					index={item.index}
					onDelete={() => handleRemoveWeek(item)}
					onDrag={drag}
					isActive={isActive}
				/>
			</ScaleDecorator>
		)
	}

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
		<View className="h-screen">
			<SafeAreaView className="	my-20">
				<Button mode="contained" onPress={handleAddWeek}>Add Week</Button>
				<DraggableFlatList
					data={boxes}
					onDragEnd={({ data }) => setBoxes(data)}
					keyExtractor={(item) => item.key}
					renderItem={renderItem}
				/>
			</SafeAreaView>
		</View>
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
		// backgroundColor: '#e0e0e0',
		// backgroundColor: 'lightwhite',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		marginHorizontal: '5%',
		// paddingVertical: 15,
		overflow: 'hidden',
	},
	gestureTapArea: {
		width: '100%',
		height: 50, // Fixed height for the tap area
		borderRadius: 10,
		// marginVertical: -1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#e0e0e0',
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	dayBox: {
		width: AnimatedDayBoxClosedWidthValue,
		height: AnimatedDayBoxClosedHeightValue,
		backgroundColor: 'beige',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		borderColor: 'black',
		borderWidth: 1,
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
