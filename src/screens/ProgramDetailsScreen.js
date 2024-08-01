import { useRoute } from '@react-navigation/native'
import { ScrollView, SafeAreaView, View, Text } from 'react-native'
import { useQuery } from '@realm/react'
import { Program } from '../models/Program'
import { TextInput } from 'react-native-paper'

export default function ProgramDetailsScreen() {
  const route = useRoute()
  const { programId } = route.params
  const program = useQuery(Program).filtered('_id == $0', programId)[0]
  console.log(program)

  const formatSets = (sets) => {
    if (sets.useRange) {
      return `${sets.min}-${sets.max} sets`
    } else {
      return `${sets.single} sets`
    }
  }

  const formatReps = (reps) => {
    if (reps.useRange) {
      return `${reps.min}-${reps.max} reps`
    } else {
      return `${reps.single} reps`
    }
  }

  const formatRPE = (rpe) => {
    if (rpe.useRange) {
      return `@ RPE ${rpe.min}-${rpe.max}`
    } else {
      return `@ RPE ${rpe.single}`
    }
  }

  const ExerciseDescription = ({ exercise }) => {
    const warmupSetsDescription = formatSets(exercise.warmup.sets)
    const warmupRepsDescription = formatReps(exercise.warmup.reps)
    const warmupRpeDescription = formatRPE(exercise.warmup.rpe)

    const workingSetsDescription = formatSets(exercise.working.sets)
    const workingRepsDescription = formatReps(exercise.working.reps)
    const workingRpeDescription = formatRPE(exercise.working.rpe)

    return (
      <View>
        <Text>
          Warmup: {warmupSetsDescription} x {warmupRepsDescription}{' '}
          {warmupRpeDescription}
        </Text>
        <Text>
          Working: {workingSetsDescription} x {workingRepsDescription}{' '}
          {workingRpeDescription}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
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
                    <ExerciseDescription exercise={exercise} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
