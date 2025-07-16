import { MongoClient } from "mongodb";

let cachedDb = null;

export async function connectToDB() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  const db = client.db(process.env.MONGODB_DBNAME);
  cachedDb = db;
  return db;
}
