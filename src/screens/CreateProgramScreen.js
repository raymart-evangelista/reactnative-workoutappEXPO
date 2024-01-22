import { useEffect, useState, useRef } from "react";
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
import { AnimatedFAB as AniFAB } from "react-native-paper";
import { WeekCard } from "../components/Card";


const AnimatedBoxHeightValue = 50
const AnimatedDayBoxClosedWidthValue = '100%'
const AnimatedDayBoxClosedHeightValue = 80
const AnimatedDayBoxOpenHeightValue = 200

const generateUniqueId = () => {
	return uuid.v4()
}

const EditWeekScreen = ({ route, navigation }) => {
	return (
		<>
		</>
	)
}

const AnimatedDayBox = ({ day, onDelete, onDrag, isActive }) => {
	const pressed = useSharedValue(false)

	const tap = Gesture.Tap()
	.onEnd(() => {
		pressed.value = !pressed.value
	})

	handlePress = () => {
		console.log(`$the key of this day is ${day.key}`)
	}

	const animatedStyle = useAnimatedStyle(() => {
		const y = 0
		return {
			height: withTiming(pressed.value ? AnimatedDayBoxOpenHeightValue : AnimatedDayBoxClosedHeightValue, {
				duration: 200,
			}),
			transform: [
				{ translateY: y },
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
				onPress={handlePress}
			>
			<GestureDetector gesture={tap}>
						<Text>Day</Text>
			</GestureDetector>
			</TouchableOpacity>
		</Animated.View>
	)
}

const WeekContainer = ({ index, week, onDelete, onDrag, isActive, navigation }) => {
	const [days, setDays] = useState(
		[		
			{
				key: generateUniqueId(),
				index: 0
			}
		]
	)
	const [numDays, setNumDays] = useState(1)

	const [disableAddDays, setDisabledAddDays] = useState(false)

	const handleDeleteWeek = () => {
		onDelete()
		setNumDays(numDays - 1)
		if (numDays < 7) {
			setDisabledAddDays(!disableAddDays)
		}
	}

	const handleAddDay = () => {
		if (numDays < 7 ) {
			const newDayIndex = days.length
			setDays(prevDays => [...prevDays, {
				key: generateUniqueId(),
				index: newDayIndex,
			}])
			setNumDays(numDays + 1)
		} else {
			setDisabledAddDays(!disableAddDays)
		}
	}

	const handleEditWeek = () => {
		navigation.navigate('EditWeek', { weekIndex: index, weekData: week })
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
		// <CollapsibleCard 
		// 	headerContent={`Week ${box.index + 1}`} 
		// 	onLongPress={onDrag} 
		// 	disabled={isActive}
		// 	// passedValue={1000}
		// >
		// 		<Button mode="contained" onPress={handleEditWeek}>Edit Week</Button>
		// 		<Button mode="contained" disabled={disableAddDays} onPress={handleAddDay}>Add Day</Button>
		// 		<Button mode ="contained" onPress={handleDelete}>Delete</Button>
		// 	<DraggableFlatList
		// 		data={days}
		// 		onDragEnd={({ data }) => setDays(data)}
		// 		keyExtractor={(item) => item.key}
		// 		renderItem={renderItem}
		// 	/>
		// </CollapsibleCard>
		<WeekCard
			title={`Week ${week.index + 1}`}
			content={'some description for the week such as the number of weeks maybe what the program'}
			onRemove={handleDeleteWeek}
			onEdit={handleEditWeek}
		/>
	)
}

const CreateProgramScreen = ({ navigation }) => {

	const [disableAddWeekButton, setDisabledAddWeekButton] = useState(false)

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

	// Function to append a week and initialize its animation
	// const handleAddWeek = () => {
	//     appendWeek({ days: [] })
	//     appendWeek({ days: [] })
	//     const newWeekAnimation = useSharedValue(0)
	//     newWeekAnimation.value = withTiming(1, { duration: 500 })
	//     weekAnimations.push(newWeekAnimation)
	// }



	const handleRemoveWeek = (weekToRemove) => {
		const keyToRemove = weekToRemove.key
		setWeeks((currentWeeks) => currentWeeks.filter((week, index) => week.key !== keyToRemove))
		console.log(`week with key [${keyToRemove}] removed`)
			
		if (weeks.length < 8) {
			setDisabledAddWeekButton(false)
		}
	}

	const handleAddWeek = () => {
		if (weeks.length < 8) {
			
			const newWeekIndex = weeks.length

			setWeeks(prevWeeks => [...prevWeeks, {
				key: generateUniqueId(),
				index: newWeekIndex,
			}])

			if (weeks.length > 1) {
				const indexToScroll = weeks.length - 1
				setTimeout(() => {
					flatListRef.current?.scrollToIndex({ animated: true, index: indexToScroll });
				}, 100);
			}
		}
	}

	const [weeks, setWeeks] = useState(
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
				<WeekContainer
					week={item}
					index={item.index}
					onDelete={() => handleRemoveWeek(item)}
					onDrag={drag}
					isActive={isActive}
					navigation={navigation}
				/>
			</ScaleDecorator>
		)
	}

	const [isExtended, setIsExtended] = useState(false)

  const handleScrollOffsetChange = (offset) => {
		const threshold = 10
		setIsExtended(offset < threshold)
  }

	const flatListRef = useRef(0)

	useEffect(() => {
		if (weeks.length > 7) {
			setDisabledAddWeekButton(true)
		} else {
			setDisabledAddWeekButton(false)
		}
	}, [weeks])

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
		<View className="h-full border-red-500 border-4">
			<SafeAreaView className="flex-1">
					<DraggableFlatList
						data={weeks}
						onDragEnd={({ data }) => setWeeks(data)}
						keyExtractor={(item) => item.key}
						renderItem={renderItem}
						containerStyle={{ flex: 1 }}
						onScrollOffsetChange={handleScrollOffsetChange}
						ref={flatListRef}
					/>
					<AniFAB
						icon={'plus'}
						label={'Add Week'}
						extended={isExtended}
						onPress={handleAddWeek}
						animateFrom={'right'}
						iconMode={'dynamic'}
						style={[styles.fabStyle]}
						disabled={disableAddWeekButton}
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
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute'
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
		// margin: 5,
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

export { CreateProgramScreen, EditWeekScreen }