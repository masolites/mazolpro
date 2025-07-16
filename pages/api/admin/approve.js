 import { connectToDB } from '../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.body;

  try {
    const db = await connectToDB();
    const transaction = await db.collection('transactions').findOne({ _id: new ObjectId(id) });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    await db.collection('transactions').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'approved' } }
    );
    
    await db.collection('users').updateOne(
      { walletAddress: transaction.walletAddress },
      { 
        $inc: { 
          balance: transaction.amount,
          tokens: transaction.purchaseType === 'fixed' ? 1000 : transaction.amount
        } 
      },
      { upsert: true }
    );
    
    res.status(200).json({ message: 'Deposit approved successfully' });
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ error: 'Approval failed' });
  }
}
