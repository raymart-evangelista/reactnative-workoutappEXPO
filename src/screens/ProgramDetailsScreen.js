import { useRoute } from '@react-navigation/native'
import { ScrollView, SafeAreaView, View, Text } from 'react-native'
import { useQuery } from '@realm/react'
import { Program } from '../models/Program'

export default function ProgramDetailsScreen() {
  const route = useRoute()
  const { programId } = route.params
  const program = useQuery(Program).filtered('_id == $0', programId)[0]
  console.log(program)

  return (
    <SafeAreaView>
      <Text>ProgramDetails</Text>
      <Text>Title: {program.title}</Text>
      <Text>Description: {program.description}</Text>

      {/* have different sections for each week,
          when the user clicks on a week, they are sent to
          another page that has each day 
          and each day will show the exercises for that day
          as well as a place to input weight if wanted
       */}

      {program.weeks.map((week, weekIndex) => (
        <View key={week._id}>
          <Text>
            Week {weekIndex + 1} - {week.title} - {week.description}
          </Text>
          {week.days.map((day, dayIndex) => (
            <View key={day._id}>
              {/* <Text>{JSON.stringify(week, null, 2)}</Text> */}
              <Text>
                Day {dayIndex + 1} - {day.title} - {day.description}
              </Text>
              {day.exercises.map((exercise, exerciseIndex) => (
                <View key={exercise._id}>
                  <Text>Exercise {exerciseIndex + 1}</Text>
                  <Text>{exercise.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </SafeAreaView>
  )
}
