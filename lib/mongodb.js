import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
let client;
export async function getDb() {
  if (!client) client = new MongoClient(uri);
  if (!client.topology?.isConnected())
    await client.connect();
  return client.db();
}
