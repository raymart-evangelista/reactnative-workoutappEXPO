const express = require('express');

const router = express.Router()

module.exports = router;

// post
router.post('/post', (req, res) => {
  res.send('Post API')
})

// get all
router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

// get by ID method
router.get('/getOne/:id', (req, res) => {
  res.send('Get by ID API')
})

// update by ID method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

// delete by ID method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})