const express = require('express')
const programsRouter = express.Router()
const computeCompletionFields = require('../middleware/computeCompletionFields')
const Program = require('../models/program')

programsRouter.post('/', computeCompletionFields, async (req, res) => {
  try {
    const { name, weeks, weekDetails } = req.body 
    const program = new Program({
      name,
      weeks,
      weekDetails,
    })

    const programToSave = await program.save()
    res.status(200).json(programToSave)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

// post
// programsRouter.post('/', async (req, res) => {
//   try {
//     const { name, weeks, weekDetails } = req.body 
//     const program = new Program({
//       name,
//       weeks,
//       weekDetails,
//     })

//     const programToSave = await program.save()
//     res.status(200).json(programToSave)
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ message: error.message })
//   }
// })

// get all
programsRouter.get('/', async (req, res) => {
  try {
    const programs = await Program.find()
    res.json(programs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// get by ID
programsRouter.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
    if (program) {
      res.json(program)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(400).send({ error: 'malformatted id'})
  }
})

// delete by ID
programsRouter.delete('/:id', async (req, res) => {
  try {
    console.log("****___****")
    console.log(req.params.id)
    const program = await Program.findByIdAndDelete(req.params.id)
    console.log(`Program with name: ${program.name} and id: ${program._id} has been deleted.`)
    res.send(`Program with name: ${program.name} and id: ${program._id} has been deleted.`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PATCH (update) by ID
programsRouter.patch('/:id', computeCompletionFields, async (req, res) => {
  try {
    req.body.updatedAt = Date.now()
    const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedProgram)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to updated program' })
  }

  // try {
  //   const { weekNum, dayNum, exerciseIndex, weightValue } = req.body

  //   const program = await Program.findById(req.params.id)

  //   if (!program) {
  //     return res.status(404).json({ message: 'Program not found' })
  //   }

  //   if (weekNum !== undefined && dayNum !== undefined && exerciseIndex !== undefined && weightValue !== undefined) {
  //     // Update exercise weight
  //     const weekDetail = program.weekDetails.find((week) => week.weekNum === weekNum)

  //     if (!weekDetail) {
  //       return res.status(404).json({ message: 'Week not found' })
  //     }

  //     const dayDetail = weekDetail.dayDetails.find((day) => day.dayNum === dayNum)

  //     if (!dayDetail) {
  //       return res.status(404).json({ message: 'Day not found' })
  //     }

  //     const exercise = dayDetail.exercises[exerciseIndex]

  //     if (!exercise) {
  //       return res.status(404).json({ message: 'Exercise not found' })
  //     }

  //     exercise.weight.value = weightValue
  //   } else {
  //     // Update entire program
  //     // Only update fields that are present in the request body
  //     Object.assign(program, req.body)

  //   }

  //   program.updatedAt = Date.now()
  //   await program.save()
  //   res.json(program)

  // } catch (error) {
  //   console.error(error)
  //   return res.status(500).json({ message: 'Failed to update program' })
  // }
})

module.exports = programsRouter