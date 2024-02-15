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
    title: 'Loading week',
    description: 'During this week, get muscles used to movements.',
    days: [
      {
        id: nanoid(),
        title: 'Push',
        description: 'chest, triceps, and shoulders',
        exercises: [
          {
            id: '-950OHZxdV8NO5waHS5TB',
            name: 'chest press',
            warmup: {
              sets: {
                amount: {
                  single: 1,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
              reps: {
                amount: {
                  single: 1,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
              rpe: {
                amount: {
                  single: 3,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
            },
            working: {
              sets: {
                amount: {
                  single: 4,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
              reps: {
                amount: {
                  single: 4,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
              rpe: {
                amount: {
                  single: 6,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
            },
          },
          {
            id: '1DB0_3Y5RHcWVsQ9qr1xt',
            name: 'shoulder press',
            warmup: {
              sets: {
                amount: {
                  single: '',
                  range: {
                    min: 0,
                    max: 2,
                  },
                },
                useRange: true,
              },
              reps: {
                amount: {
                  single: '',
                  range: {
                    min: 5,
                    max: 8,
                  },
                },
                useRange: true,
              },
              rpe: {
                amount: {
                  single: '',
                  range: {
                    min: 4,
                    max: 6,
                  },
                },
                useRange: true,
              },
            },
            working: {
              sets: {
                amount: {
                  single: 2,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
              reps: {
                amount: {
                  single: '',
                  range: {
                    min: 7,
                    max: 9,
                  },
                },
                useRange: true,
              },
              rpe: {
                amount: {
                  single: 9,
                  range: {
                    min: '',
                    max: '',
                  },
                },
                useRange: false,
              },
            },
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
      const weekIndex = state.findIndex((week) => week.id === weekId)
      if (weekIndex !== -1) {
        state[weekIndex].days = newDaysOrder
      }
    },
    exerciseAdded: (state, action) => {
      const { weekId, dayId, exercise } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        const day = week.days.find((day) => day.id === dayId)
        if (day) {
          const newExercise = { ...exercise }
          day.exercises.push(newExercise)
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
    exerciseUpdated: (state, action) => {
      const { weekId, dayId, exerciseId, updates } = action.payload
      const week = state.find((week) => week.id === weekId)
      if (week) {
        const day = week.days.find((day) => day.id === dayId)
        if (day) {
          const exerciseIndex = day.exercises.findIndex(
            (exercise) => exercise.id === exerciseId
          )
          if (exerciseIndex !== -1) {
            // update logic here
            day.exercises[exerciseIndex] = {
              ...day.exercises[exerciseIndex],
              ...updates,
            }
          }
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
  weekUpdated,
  weeksReordered,
  dayAdded,
  dayRemoved,
  dayUpdated,
  daysReordered,
  exerciseAdded,
  exerciseRemoved,
  exercisesReordered,
  exerciseUpdated,
} = weeksSlice.actions
export default weeksSlice.reducer
