import axios from "axios"
const baseUrl = 'http://localhost:3000/api'

const getAll = () => {

}

const signUp = (username, email, password) => {
  return axios.post(`${baseUrl}/signup`, { username, email, password })
}

export default {
  getAll: getAll,
  signUp: signUp,
}