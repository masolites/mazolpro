import { connectToDB } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await connectToDB();
    const deposits = await db.collection('transactions')
      .find({ method: 'manual', status: 'pending' })
      .toArray();
    
    res.status(200).json(deposits);
  } catch (error) {
    console.error('Fetch deposits error:', error);
    res.status(500).json({ error: 'Failed to fetch deposits' });
  }
}
