import { configureStore } from '@reduxjs/toolkit'

import weeksReducer from '../features/program/weeksSlice'
import programReducer from '../features/programSlice'
import programsReducer from '../features/programsSlice'
import userReducer from '../features/userSlice'

export default configureStore({
  reducer: {
    program: programReducer,
    weeks: weeksReducer,
    programs: programsReducer,
    user: userReducer,
  },
})
