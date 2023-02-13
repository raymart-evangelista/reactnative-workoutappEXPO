require('dotenv').config()

const mongoString = process.env.DATABASE_URL
import express from "express"
import mongoose from "mongoose"

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})

const app = express()

app.use(express.json())

const routes = require('./routes/routes');
app.use('/api', routes)

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})


