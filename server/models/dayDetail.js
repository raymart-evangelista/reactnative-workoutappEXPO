const mongoose = require('mongoose')
const exerciseDetailSchema = require('./exerciseDetail')

const dayDetailSchema = new mongoose.Schema({
  name: String,
  dayNum: Number,
  exercises: [exerciseDetailSchema]
})

module.exports = dayDetailSchema