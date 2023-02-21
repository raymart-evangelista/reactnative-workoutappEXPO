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

const usersRouter = require('./routes/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./routes/login')
app.use('/api/login', loginRouter)

const programsRouter = require('./routes/programs')
app.use('/api/programs', programsRouter)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
})


