require('dotenv').config()

const mongoString = process.env.DATABASE_URL
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

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
app.use(cors())

const routes = require('./routes/routes');
app.use('/api', routes)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})


