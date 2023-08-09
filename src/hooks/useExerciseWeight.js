import { useState, useEffect } from 'react'
import programsService from "../services/programs"

const useExerciseWeight = (initialWeight, program, week, day, exercise) => {
  const [weightValue, setWeightValue] = useState(initialWeight)

  useEffect(() => {
    const updateWeightValue = async () => {
      try {
        if (exercise && exercise.weight.value !== weightValue) {
          await programsService.updateExerciseWeight(program.id, week._id, day._id, exercise._id, weightValue)
        }
      } catch (error) {
        console.error('Failed to update exercise weight: ', error)
      }
    }

    updateWeightValue()
  }, [weightValue])

  return [weightValue, setWeightValue]
}

export default useExerciseWeight