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

export default { getProgram, deleteProgram }