import { createSlice, nanoid } from '@reduxjs/toolkit'

// this can be the user's programs
const initialState = {
  programs: [],
}

export const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    addProgram: (state, action) => {
      state.programs.push({ ...action.payload, id: nanoid() })
      console.log(
        `\t---program was added. There are now: ${state.programs.length} programs`
      )
      console.log('\n\n')
    },
    updateProgram: (state, action) => {
      const { id, ...updates } = action.payload
      const program = state.programs.find((program) => program.id === id)
      if (program) {
        for (const key in updates) {
          // program[key] = updates[key]
          // can also be written as
          Object.assign(program, updates)
        }
      }
    },
    deleteProgram: (state, action) => {
      state.programs = state.programs.filter(
        (program) => program.id !== action.payload.id
      )
    },
  },
})

export const { addProgram, updateProgram, deleteProgram } =
  programsSlice.actions
export default programsSlice.reducer
