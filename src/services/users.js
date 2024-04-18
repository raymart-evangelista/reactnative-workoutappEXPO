import axios from 'axios'
import Constants from 'expo-constants'

const baseUrl = Constants.expoConfig.extra.BASE_USERS_URL

const getAll = () => {}

// const signUp = (username, email, password) => {
//   return axios.post(`${baseUrl}/signup`, { username, email, password })
// }

const signUp = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Signup failed')
    } else {
      throw new Error('Signup failed due to network or system error')
    }
  }
}

export default { getAll, signUp }
