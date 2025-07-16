import { connectToDB } from '../../../lib/db';
import Flutterwave from 'flutterwave-node-v3';

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = await req.formData();
  const walletAddress = formData.get('walletAddress');
  const amount = parseFloat(formData.get('amount'));
  const purchaseType = formData.get('purchaseType');

  try {
    const db = await connectToDB();
    
    const transaction = {
      walletAddress,
      amount,
      purchaseType,
      status: 'pending',
      method: 'flutterwave',
      createdAt: new Date()
    };
    
    const result = await db.collection('transactions').insertOne(transaction);
    const transactionId = result.insertedId.toString();

    const paymentData = {
      tx_ref: `mazolpro-${Date.now()}`,
      amount,
      currency: 'NGN',
      redirect_url: `${process.env.BASE_URL}/api/deposit/callback`,
      customer: {
        email: 'user@mazolpro.com',
        name: 'MazolPro User'
      },
      customizations: {
        title: 'MazolPro Token Purchase',
        description: `${purchaseType} purchase`
      },
      meta: {
        transactionId
      }
    };

    const response = await flw.Payment.initiate(paymentData);
    
    if (response.status === 'success') {
      res.status(200).json({ paymentLink: response.data.link });
    } else {
      throw new Error('Flutterwave payment initiation failed');
    }
  } catch (error) {
    console.error('Flutterwave deposit error:', error);
    res.status(500).json({ error: error.message || 'Deposit failed' });
  }
}
