import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const googleUser = await response.json()

      const user = {
        id: googleUser.id,
        firstName: googleUser.given_name || '',
        lastName: googleUser.family_name || '',
        email: googleUser.email,
      }

      await AsyncStorage.setItem('@user', JSON.stringify(user))

      return user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  isAuthenticated: false,
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action) => {
    //   state.isAuthenticated = true
    //   state.user = action.payload
    // },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      AsyncStorage.removeItem('@user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload
        state.status = 'succeeded'
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
