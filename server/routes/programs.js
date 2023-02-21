const express = require('express')

const programsRouter = express.Router()
const Program = require('../models/program')

programsRouter.post('/', async (req, res) => {
  try {
    const { name, weeks } = req.body

    const program = new Program({
      name,
      weeks
    })

    const programToSave = await program.save()
    res.status(200).json(programToSave)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = programsRouter