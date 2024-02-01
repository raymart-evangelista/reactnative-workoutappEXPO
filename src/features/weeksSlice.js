import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-native-uuid'
import { nanoid } from '@reduxjs/toolkit'

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
          },
        ],
      },
    ],
  },
]

export const weeksSlice = createSlice({
  name: 'weeks',
  initialState,
  reducers: {
    weekAdded: (state, action) => {
      state.push(action.payload)
    },
    weekRemoved: (state, action) => {
      return state.filter((week) => week.id !== action.payload.id)
    },
    weekUpdated: (state, action) => {
      const { id, title, description } = action.payload
      const week = state.find((week) => week.id === id)
      if (week) {
        week.title = title
        week.description = description
      }
    },
    weeksReordered: (state, action) => {
      return action.payload
    },
    dayAdded: (state, action) => {
      const { weekId, day } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        week.days.push(day)
      }
    },
    dayRemoved: (state, action) => {
      const { weekId, dayId } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        week.days = week.days.filter((day) => day.id !== dayId)
      }
    },
    dayUpdated: (state, action) => {
      const { weekId, dayId, title, description } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        const day = week.days.find((day) => day.id === dayId)
        if (day) {
          day.title = title
          day.description = description
        }
      }
    },
    daysReordered: (state, action) => {
      const { weekId, newDaysOrder } = action.payload
      const weekIndex = stae.findIndex((week) => week.id === weekId)
      if (weekIndex !== -1) {
        state[weekIndex].days = newDaysOrder
      }
      return action.payload
    },
    exerciseAdded: (state, action) => {
      const { weekId, dayId, exercise } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        const day = week.days.find((day) => day.id === dayId)
        if (day) {
          day.exercises = [...day.exercises, { ...exercise, id: nanoid() }]
        }
      }
    },
    exerciseRemoved: (state, action) => {
      const { weekId, dayId, exerciseId } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        const day = week.days.find((day) => day.id === dayId)
        if (day) {
          day.exercises = day.exercises.filter(
            (exercise) => exercise.id !== exerciseId
          )
        }
      }
    },
    exercisesReordered: (state, action) => {
      const { weekId, dayId, newExercisesOrder } = action.payload
      const weekIndex = state.findIndex((week) => week.id === weekId)
      if (weekIndex !== -1) {
        const dayIndex = state[weekIndex].days.findIndex(
          (day) => day.id === dayId
        )
        if (dayIndex !== -1) {
          state[weekIndex].days[dayIndex].exercises = newExercisesOrder
        }
      }
    },
  },
})

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// export const selectWeek = state => state.counter.value

export const {
  weekAdded,
  weekRemoved,
  dayAdded,
  dayRemoved,
  dayUpdated,
  exerciseAdded,
  exerciseRemoved,
  weekUpdated,
  weeksReordered,
  daysReordered,
  exercisesReordered,
} = weeksSlice.actions
export default weeksSlice.reducer
