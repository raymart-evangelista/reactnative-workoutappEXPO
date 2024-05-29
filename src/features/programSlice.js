import { createSlice, nanoid } from '@reduxjs/toolkit'
import { BSON } from 'realm'

const initialState = {
  _id: new BSON.ObjectId(),
  title: 'New Program',
  description: 'Description of the program.',
  weeks: [
    {
      _id: new BSON.ObjectId(),
      title: 'PREPARATION week',
      description:
        'During this week, get muscles used to movements. Test maxes',
      days: [
        {
          _id: new BSON.ObjectId(),
          title: 'Push',
          description: 'chest, triceps, and shoulders',
          exercises: [
            {
              _id: new BSON.ObjectId(),
              name: 'chest press',
              warmup: {
                sets: {
                  single: 1,
                  min: '',
                  max: '',
                  useRange: false,
                },
                reps: {
                  single: 1,
                  min: '',
                  max: '',
                  useRange: false,
                },
                rpe: {
                  single: 3,
                  min: '',
                  max: '',
                  useRange: false,
                },
              },
              working: {
                sets: {
                  single: 4,
                  min: '',
                  max: '',
                  useRange: false,
                },
                reps: {
                  single: 4,
                  min: '',
                  max: '',
                  useRange: false,
                },
                rpe: {
                  single: 6,
                  min: '',
                  max: '',
                  useRange: false,
                },
              },
            },
            {
              _id: new BSON.ObjectId(),
              name: 'shoulder press',
              warmup: {
                sets: {
                  single: '',
                  min: 0,
                  max: 2,
                  useRange: true,
                },
                reps: {
                  single: '',
                  min: 5,
                  max: 8,
                  useRange: true,
                },
                rpe: {
                  single: '',
                  min: 4,
                  max: 6,
                  useRange: true,
                },
              },
              working: {
                sets: {
                  single: 2,
                  min: '',
                  max: '',
                  useRange: false,
                },
                reps: {
                  single: '',
                  min: 7,
                  max: 9,
                  useRange: true,
                },
                rpe: {
                  single: 9,
                  min: '',
                  max: '',
                  useRange: false,
                },
              },
            },
          ],
        },
      ],
    },
    {
      _id: new BSON.ObjectId(),
      title: 'START week',
      description: 'During this week, get muscles used to movements.',
      days: [
        {
          _id: new BSON.ObjectId(),
          title: 'Push',
          description: 'chest, triceps, and shoulders',
          exercises: [
            {
              _id: new BSON.ObjectId(),
              name: 'chest press',
              warmup: {
                sets: {
                  single: 1,
                  min: '',
                  max: '',
                  useRange: false,
                },
                reps: {
                  single: 1,
                  min: '',
                  max: '',
                  useRange: false,
                },
                rpe: {
                  single: 3,
                  min: '',
                  max: '',
                  useRange: false,
                },
              },
              working: {
                sets: {
                  single: 4,
                  min: '',
                  max: '',
                  useRange: false,
                },
                reps: {
                  single: 4,
                  min: '',
                  max: '',
                  useRange: false,
                },
                rpe: {
                  single: 6,
                  min: '',
                  max: '',
                  useRange: false,
                },
              },
            },
            {
              _id: new BSON.ObjectId(),
              name: 'shoulder press',
              warmup: {
                sets: {
                  single: '',
                  min: 0,
                  max: 2,
                  useRange: true,
                },
                reps: {
                  single: '',
                  min: 5,
                  max: 8,
                  useRange: true,
                },
                rpe: {
                  single: '',
                  min: 4,
                  max: 6,
                  useRange: true,
                },
              },
              working: {
                sets: {
                  single: 2,
                  min: '',
                  max: '',
                  useRange: false,
                },
                reps: {
                  single: '',
                  min: 7,
                  max: 9,
                  useRange: true,
                },
                rpe: {
                  single: 9,
                  min: '',
                  max: '',
                  useRange: false,
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    programAdded: (state, action) => {},
    programRemoved: (state, action) => {},
    resetProgram: (state) => {
      state.title = 'New Program'
      state.description = 'Description of the program.'
      state.weeks = []
      console.log(`\t\t--program reset`)
    },
    programUpdated: (state, action) => {
      const { title, description } = action.payload
      state.title = title
      state.description = description
    },
    weekAdded: (state, action) => {
      state.weeks.push(action.payload)
    },
    weekRemoved: (state, action) => {
      state.weeks = state.weeks.filter(
        (week) => week._id !== action.payload._id
      )
    },
    weekUpdated: (state, action) => {
      const { _id, title, description } = action.payload
      const week = state.weeks.find((week) => week._id === _id)
      if (week) {
        week.title = title
        week.description = description
      }
    },
    weeksReordered: (state, action) => {
      state.weeks = action.payload
    },
    dayAdded: (state, action) => {
      const { weekId, day } = action.payload
      const week = state.weeks.find((week) => week._id === weekId)
      if (week) {
        week.days.push(day)
      }
    },
    dayRemoved: (state, action) => {
      const { weekId, dayId } = action.payload
      const week = state.weeks.find((week) => week._id === weekId)
      if (week) {
        week.days = week.days.filter((day) => day._id !== dayId)
      }
    },
    dayUpdated: (state, action) => {
      const { weekId, dayId, title, description } = action.payload
      const week = state.weeks.find((week) => week._id === weekId)
      if (week) {
        const day = week.days.find((day) => day._id === dayId)
        if (day) {
          day.title = title
          day.description = description
        }
      }
    },
    daysReordered: (state, action) => {
      const { weekId, newDaysOrder } = action.payload
      const weekIndex = state.weeks.findIndex((week) => week._id === weekId)
      if (weekIndex !== -1) {
        state.weeks[weekIndex].days = newDaysOrder
      }
    },
    exerciseAdded: (state, action) => {
      const { weekId, dayId, exercise } = action.payload
      const week = state.weeks.find((week) => week._id === weekId)
      if (week) {
        const day = week.days.find((day) => day._id === dayId)
        if (day) {
          const newExercise = { ...exercise }
          day.exercises.push(newExercise)
        }
      }
    },
    exerciseRemoved: (state, action) => {
      const { weekId, dayId, exerciseId } = action.payload
      const week = state.weeks.find((week) => week._id === weekId)
      if (week) {
        const day = week.days.find((day) => day._id === dayId)
        if (day) {
          day.exercises = day.exercises.filter(
            (exercise) => exercise._id !== exerciseId
          )
        }
      }
    },
    exerciseUpdated: (state, action) => {
      const { weekId, dayId, exerciseId, updates } = action.payload
      const week = state.weeks.find((week) => week._id === weekId)
      if (week) {
        const day = week.days.find((day) => day._id === dayId)
        if (day) {
          const exerciseIndex = day.exercises.findIndex(
            (exercise) => exercise._id === exerciseId
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
      const weekIndex = state.weeks.findIndex((week) => week._id === weekId)
      if (weekIndex !== -1) {
        const dayIndex = state[weekIndex].days.findIndex(
          (day) => day._id === dayId
        )
        if (dayIndex !== -1) {
          state.weeks[weekIndex].days[dayIndex].exercises = newExercisesOrder
        }
      }
    },
  },
})

export const {
  resetProgram,
  programAdded,
  programRemoved,
  programUpdated,
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
} = programSlice.actions
export default programSlice.reducer
