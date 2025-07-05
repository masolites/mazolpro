import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  // For initial deployment, return test user data
  // In production, you'll fetch real user data based on session/auth
  res.status(200).json({
    tokens: 1500,
    stage: 3,
    isBuyer: true,
    address: null
  });
}
