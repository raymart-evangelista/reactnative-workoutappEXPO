import { configureStore } from '@reduxjs/toolkit'

import weeksReducer from '../features/programs/weeksSlice'

export default configureStore({
  reducer: {
    weeks: weeksReducer,
  },
})
