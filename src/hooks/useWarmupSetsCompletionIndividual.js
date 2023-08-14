import { useState, useEffect } from 'react'
import programsService from '../services/programs'

const useSetsCompletion = (
  initialCompletionIndividual, 
  program, 
  week, 
  day, 
  exercise
  ) => {
  const [setsCompletionOverall, setSetsCompletionOverall] = useState(initialCompletionOverall)
  const [setsCompletionIndividual, setSetsCompletionIndividual] = useState(initialCompletionIndividual)

  useEffect(() => {
    const updateSetCompletion = async () => {
      try {
        if (exercise && exercise.warmupSetsCompletion.individual !== setsCompletionOverall) {
          // await programsService.update
        }
      } catch (error) {
        
      }
    }
  })
}