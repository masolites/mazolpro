import { connectToDB } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress } = req.body;

  try {
    const db = await connectToDB();
    const user = await db.collection('users').findOne({ walletAddress });
    
    if (!user) {
      return res.status(200).json({ balance: 0, tokens: 0 });
    }

    res.status(200).json({
      balance: user.balance || 0,
      tokens: user.tokens || 0
    });
  } catch (error) {
    console.error('Balance check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
