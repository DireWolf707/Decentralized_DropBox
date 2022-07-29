const { MongoClient } = require("mongodb")
require("dotenv").config({path: '../.env'})

const url = process.env.mongoURI
const client = new MongoClient(url)
const dbName = "parse"

async function main() {
  await client.connect()
  console.log("Connected successfully to server")
  const db = client.db(dbName)
  const collection = db.collection("File")
  await collection.createIndex({ name: "text" })
  return "done"
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
