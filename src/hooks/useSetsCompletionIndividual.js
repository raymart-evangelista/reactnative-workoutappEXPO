import { useState, useEffect } from 'react'
import programsService from '../services/programs'

const useSetsCompletionIndividual = (
  setType,
  initialCompletionIndividual, 
  program, 
  week, 
  day, 
  exercise
  ) => {
  const [setsCompletionIndividual, setSetsCompletionIndividual] = useState(initialCompletionIndividual)

  useEffect(() => {
    const updateSetCompletion = async () => {
      try {
        const currentSetCompletion = exercise[`${setType}SetsCompletion`]?.individual
        // console.log('exercise.warmupSetsCompletion.individual in Hook:', exercise.warmupSetsCompletion.individual)
        // console.log('warmupSetsCompletionIndividual in Hook:', warmupSetsCompletionIndividual)

        if (exercise && currentSetCompletion !== setsCompletionIndividual) {
          await programsService.updateExerciseWarmupSetsCompletionIndividual(
            program.id, 
            week._id, 
            day._id, 
            exercise._id, 
            setsCompletionIndividual,
            setType
            )
        }
      } catch (error) {
        console.error('Failed to update exercise weight: ', error)
      }
    }

    updateSetCompletion()
  }, [setsCompletionIndividual])

  return [setsCompletionIndividual, setSetsCompletionIndividual]
}

export default { useSetsCompletionIndividual }