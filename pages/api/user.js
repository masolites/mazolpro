import { connectToDatabase } from '../../lib/mongo';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    res.status(200).json({
      tokens: 500,
      stage: 1,
      isBuyer: false
    });
  } catch (error) {
    res.status(200).json({
      tokens: 500,
      stage: 1,
      isBuyer: false
    });
  }
}
