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
    days: [
      {
        id: nanoid(),
        title: 'untitled day',
        description: 'default day description',
        exercises: [
          {
            id: nanoid(),
          }
        ]
      }
    ],
  }
]

export const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    weekAdded: (state, action) => {
      state.push(action.payload)
    },
    weekRemoved: (state, action) => {
      return state.filter(week => week.id !== action.payload.id)
    },
    dayAdded: (state, action) => {
      const { weekId, day } = action.payload
      const week = state.find(week => week.id === weekId)
      if (week) {
        week.days.push(day)
      }
    },
    dayRemoved: (state, action) => {
      const { weekId, dayId } = action.payload
      const week = state.find(week => week.id === weekId)
      if (week) {
        week.days = week.days.filter(day => day.id !== dayId)
      }
    },
    exerciseAdded: (state, action) => {
      const { weekId, dayId, exercise } = action.payload
      const week = state.find(week => week.id === weekId)
      if (week) {
        const day = week.days.find(day => day.id === dayId)
        if (day) {
          day.exercises = [...day.exercises, { ...exercise, id: nanoid() }];
        }
      }
    }
  }
})

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// export const selectWeek = state => state.counter.value

export const { weekAdded, weekRemoved, dayAdded, dayRemoved, exerciseAdded } = weeksSlice.actions
export default weeksSlice.reducer