// import { MongoClient } from "mongodb";
const { MongoClient } = require('mongodb');

const uri = `mongodb://localhost:27017/workoutappexpoDB`
const client = new MongoClient(uri, { useNewUrlParser: true })

// const database = client.db('test')
// const collection = database.collection('user')

client.connect((err) => {
  if (err) throw err
  console.log('Connected to the MongoDB database')
})

// db operations

client.close((err) => {
  if (err) throw err
  console.log('Disconnected from the MongoDB database')
})