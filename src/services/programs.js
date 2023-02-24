import axios from "axios"
const baseUrl = 'http://localhost:3000/api/programs'

const getProgram = async () => {
  try {
    const res = await axios.get(baseUrl)
    const programs = res.data.map(program => {
      return {
        id: program._id,
        name: program.name,
        weeks: program.weeks
      }
    })
    // return res.data
    return programs
  } catch (error) {
    console.error(error)
    return []
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
  console.log(` this is id ${id}`)
  console.log(updatedFields)
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, updatedFields)
    return res.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update program')
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

export default { getProgram, deleteProgram, updateProgram, createProgram }