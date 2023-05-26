import axios from "axios"

import Constants from 'expo-constants'
const baseUrl =  Constants.expoConfig.extra.BASE_URL

// const baseUrl = 'http://localhost:3000/api/programs'
// console.log(baseUrl)

const getPrograms = async () => {
  try {
    const res = await axios.get(baseUrl)
    const programs = res.data.map(program => {
      return {
        id: program._id,
        name: program.name,
        weeks: program.weeks,
        weekDetails: program.weekDetails,
        createdAt: program.createdAt,
        updatedAt: program.updatedAt
      }
    })
    // return res.data
    return programs
  } catch (error) {
    console.error(error)
    return []
  }
}

const getProgramById = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/${id}`)
    const program = {
      id: res.data._id,
      name: res.data.name,
      weeks: res.data.weeks,
      weekDetails: res.data.weekDetails,
      createdAt: res.data.createdAt,
      updatedAt: res.data.updatedAt
    }
    return program
  } catch (error) {
    console.error(error)
    return null
  }
}

const deleteProgram = async (id) => {
  try {
    console.log("****___****")
    console.log(id)
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
  } catch (error) {
    
  }
}

const updateProgram = async (id, updatedFields) => {
  console.log("/// inside services ///")
  console.log(updatedFields)
  console.log("/// inside services ///")

  try {
    const res = await axios.patch(`${baseUrl}/${id}`, updatedFields)
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update program')
  }
}

const updateExerciseWeight = async (programId, weekId, dayId, exerciseId, weightValue) => {
  console.log(`inside updateExerciseWeight service`)
  try {
    // fetch program by ID
    const program = await axios.get(`${baseUrl}/${programId}`)
    const updatedProgram = program.data
    
    // Find specified week, day, and exercise in the program
    const week = updatedProgram.weekDetails.find(week => week._id === weekId)
    if (!week) {
      throw new Error('Week not found')
    }

    const day = week.dayDetails.find(day => day._id === dayId)
    if (!day) {
      throw new Error('Day not found')
    }
    
    const exercise = day.exercises.find(exercise => exercise._id === exerciseId)
    console.log(exercise.weight.value)
    if (!exercise) {
      throw new Error('Exercise not found')
    }

    // update weight value
    exercise.weight.value = weightValue

    console.log(`\tbaah`)
    console.log(updatedProgram.weekDetails[0].dayDetails[0].exercises[0].weight)

    const res = await axios.patch(`${baseUrl}/${programId}`, updatedProgram)
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update exercise weight')
  }
}

// post new program, createProgram function
const createProgram = async (programData) => {
  try {
    console.log(programData)
    const res = await axios.post(`${baseUrl}`, programData)
    return res.data
  } catch (error) {
    console.error(error)
  }

}

export default { getPrograms, getProgramById, deleteProgram, updateProgram, updateExerciseWeight, createProgram }