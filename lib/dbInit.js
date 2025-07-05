import { MongoClient } from 'mongodb';

export async function initDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  
  // Create collections if they don't exist
  const collections = ['users', 'transactions', 'mining_sessions'];
  for (const collName of collections) {
    if (!(await db.listCollections({name: collName}).hasNext())) {
      await db.createCollection(collName);
    }
  }
  
  // Create demo user if none exists
  const users = db.collection('users');
  if (await users.countDocuments() === 0) {
    await users.insertOne({
      id: 'demo-user',
      tokens: 0,
      stage: 1,
      isBuyer: false,
      createdAt: new Date()
    });
  }
  
  return db;
}
