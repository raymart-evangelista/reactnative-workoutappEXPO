import { useState, useEffect } from 'react'
import programsService from '../services/programs'

const useWarmupSetsCompletionIndividual = (
  initialCompletionIndividual, 
  program, 
  week, 
  day, 
  exercise
  ) => {
  const [warmupSetsCompletionIndividual, setWarmupSetsCompletionIndividual] = useState(initialCompletionIndividual)

  useEffect(() => {
    const updateSetCompletion = async () => {
      try {
        console.log('exercise.warmupSetsCompletion.individual in Hook:', exercise.warmupSetsCompletion.individual)
        console.log('warmupSetsCompletionIndividual in Hook:', warmupSetsCompletionIndividual)
        if (exercise && exercise.warmupSetsCompletion.individual !== warmupSetsCompletionIndividual) {
          await programsService.updateExerciseWarmupSetsCompletionIndividual(program.id, week._id, day._id, exercise._id, warmupSetsCompletionIndividual)
        }
      } catch (error) {
        console.error('Failed to update exercise weight: ', error)
      }
    }

    updateSetCompletion()
  }, [warmupSetsCompletionIndividual])

  return [warmupSetsCompletionIndividual, setWarmupSetsCompletionIndividual]
}

export default useWarmupSetsCompletionIndividual