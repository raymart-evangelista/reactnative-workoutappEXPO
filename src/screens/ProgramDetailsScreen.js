import { useRoute } from '@react-navigation/native'
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TextComponent,
} from 'react-native'
import { useQuery } from '@realm/react'
import { Program } from '../models/Program'
import { Card, Divider, TextInput } from 'react-native-paper'
import { useThemedStyles } from '../styles/globalStyles'

export default function ProgramDetailsScreen() {
  const styles = useThemedStyles()
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

    console.log(exercise.working.sets)

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
        <Text>Weight: {exercise.working.sets.weight}</Text>
      </View>
    )
  }

  const ExerciseCard = ({ exercise }) => {
    return (
      <Card key={exercise._id}>
        <Card.Title title={exercise.name} subtitle={exercise.description} />
        <Card.Content>
          <ExerciseDescription exercise={exercise} />
        </Card.Content>
      </Card>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerText}>{program.title}</Text>
        <Text style={styles.descriptionText}>{program.description}</Text>
        {program.weeks.map((week, weekIndex) => (
          <Card key={week._id} style={styles.weekCard}>
            <Card.Title
              title={`Week ${weekIndex + 1} - ${week.title}`}
              subtitle={week.description}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
              subtitleNumberOfLines={4}
            />
            <Card.Content>
              <Divider style={styles.divider} />
              {week.days.map((day, dayIndex) => (
                <View key={day._id} style={styles.dayContainer}>
                  <Text style={styles.dayText}>
                    Day {dayIndex + 1} - {day.title}
                  </Text>
                  <Text style={styles.dayDescription}>{day.description}</Text>
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <View key={exercise._id} style={styles.exerciseContainer}>
                      <ExerciseCard exercise={exercise} />
                    </View>
                  ))}
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
