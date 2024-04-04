import { configureStore } from '@reduxjs/toolkit'

import weeksReducer from '../features/program/weeksSlice'
import programReducer from '../features/programSlice'

export default configureStore({
  reducer: {
    program: programReducer,
    weeks: weeksReducer,
  },
})
