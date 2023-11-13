const mongoose = require('mongoose')
const dayDetailSchema = require('./dayDetail')

const weekDetailSchema = new mongoose.Schema({
  weekNum: Number,
  days: [dayDetailSchema]
})

module.exports = weekDetailSchema