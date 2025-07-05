import { connectToDatabase } from '../../../lib/mongodb';
import Flutterwave from 'flutterwave-node-v3';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY
  );

  try {
    // Initialize payment with Flutterwave
    const payload = {
      tx_ref: `fixed-${Date.now()}-${address}`,
      amount: 1000,
      currency: 'NGN',
      payment_options: 'card',
      customer: {
        email: 'user@example.com', // Get from user profile in production
      },
      customizations: {
        title: 'MAZOL Fixed Package',
        description: 'Stage 1 Fixed Token Purchase',
      },
      meta: {
        wallet_address: address,
        purchase_type: 'fixed'
      }
    };

    const response = await flw.Payment.initialize(payload);
    
    // In production: Store transaction in DB with status 'pending'
    // const { db } = await connectToDatabase();
    // await db.collection('transactions').insertOne({
    //   ...payload,
    //   status: 'pending',
    //   createdAt: new Date(),
    // });
    
    // Return payment link to frontend
    res.status(200).json({ 
      success: true, 
      paymentLink: response.data.link,
      newStage: 2 // In production, calculate based on matrix logic
    });
  } catch (error) {
    console.error('Flutterwave error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
}
