import { configureStore } from '@reduxjs/toolkit'

import weeksReducer from '../features/program/weeksSlice'
import programReducer from '../features/programSlice'
import programsReducer from '../features/programsSlice'
import userReducer from '../features/userSlice'
import authReducer from '../features/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    program: programReducer,
    weeks: weeksReducer,
    programs: programsReducer,
    user: userReducer,
  },
})
