import { MongoClient } from "mongodb";

const uri = `mongodb://0.0.0.0:27017/`
const client = new MongoClient(uri, { useNewUrlParser: true })

const database = client.db('test')

client.connect((err) => {
  if (err) throw err
  console.log('Connected to the MongoDB database')
})

// db operations

client.close((err) => {
  if (err) throw err
  console.log('Disconnected from the MongoDB database')
})