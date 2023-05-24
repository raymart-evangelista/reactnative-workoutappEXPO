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

const updateExerciseWeight = async (id, weekNum, dayNum, exerciseIndex, weightValue) => {
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, {weekNum, dayNum, exerciseIndex, weightValue})
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