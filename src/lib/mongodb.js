// Example stub for MongoDB connection
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
let client;
export default async function dbConnect() {
  if (!client) client = new MongoClient(uri);
  if (!client.isConnected()) await client.connect();
  return client.db();
}

