const express = require('express');

const router = express.Router()
const Model = require('../models/model')


// post
router.post('/post', async (req, res) => {
  // res.send('Post API')
  const data = new Model({
    name: req.body.name,
    age: req.body.age
  })

  try {
    const dataToSave = await data.save()
    res.status(200).json(dataToSave)

  } catch (error) {
    res.status(400).json({ message: error.message })

  }
})

// get all
router.get('/getAll', async (req, res) => {
  try {
    const data = await Model.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// get by ID method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Model.findById(req.params.id)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// update by ID method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true }

    const result = await Model.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// delete by ID method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Model.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;
