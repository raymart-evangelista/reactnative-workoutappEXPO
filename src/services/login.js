import axios from 'axios'
import Constants from 'expo-constants'
// const baseUrl = 'http://localhost:3000/api/login'
const baseUrl = Constants.expoConfig.extra.BASE_LOGIN_URL

const login = async (credentials) => {
  try {
    // console.log(baseUrl)
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Login failed')
    } else {
      throw new Error('Login failed due to network or system error')
    }
  }
}

export default { login }
