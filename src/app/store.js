import { configureStore } from '@reduxjs/toolkit'

import weeksReducer from '../features/program/weeksSlice'

export default configureStore({
  reducer: {
    weeks: weeksReducer,
  },
})
