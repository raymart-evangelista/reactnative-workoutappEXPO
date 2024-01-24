import { configureStore } from "@reduxjs/toolkit";

import weeksReducer from '../features/weeksSlice'

export default configureStore({
  reducer: {
    weeks: weeksReducer
  }
})