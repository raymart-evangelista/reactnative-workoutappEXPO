import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid'
import { nanoid } from "@reduxjs/toolkit";

// const generateUniqueId = () => {
//   return uuid.v4()
// }

const initialState = [
  {
    // id: generateUniqueId(),
    id: nanoid(),
    title: 'default week title',
    description: 'default week description',
    index: 0
  }
]

export const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    weekAdded: (state, action) => {
      state.push(action.payload)
    },

  }
})

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// export const selectWeek = state => state.counter.value

export const { weekAdded } = weeksSlice.actions
export default weeksSlice.reducer