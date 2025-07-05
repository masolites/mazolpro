import { initDatabase } from '../../../lib/dbInit';
import Flutterwave from 'flutterwave-node-v3';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const db = await initDatabase();
    const flw = new Flutterwave(
      process.env.FLW_PUBLIC_KEY,
      process.env.FLW_SECRET_KEY
    );
    
    const payload = {
      tx_ref: `fixed-${Date.now()}`,
      amount: 1000,
      currency: 'NGN',
      payment_options: 'card',
      customer: { email: 'user@example.com' },
      customizations: { title: 'MAZOL Fixed Purchase' }
    };
    
    const response = await flw.Payment.initialize(payload);
    
    // Update user in database
    await db.collection('users').updateOne(
      { id: 'demo-user' },
      { $set: { isBuyer: true, stage: 2 } }
    );
    
    res.status(200).json({ link: response.data.link });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
}
