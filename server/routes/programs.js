const express = require('express')

const programsRouter = express.Router()
const Program = require('../models/program')

// post
programsRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const program = new Program({
      name
    })

    const programToSave = await program.save()
    res.status(200).json(programToSave)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

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
programsRouter.patch('/:id', async (req, res) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedProgram)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to updated program' })
  }
})

module.exports = programsRouter