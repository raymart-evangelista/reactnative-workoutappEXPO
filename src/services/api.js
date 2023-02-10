import axios from "axios"
const baseUrl = 'http://localhost:3000/api'

const getAll = () => {

}

// const signUp = (username, email, password) => {
//   return axios.post(`${baseUrl}/signup`, { username, email, password })
// }

const signUp = async (username, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, { username, email, password })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default { getAll, signUp }