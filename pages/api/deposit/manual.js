 import { connectToDB } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = await req.formData();
    const walletAddress = formData.get('walletAddress');
    const amount = parseFloat(formData.get('amount'));
    const purchaseType = formData.get('purchaseType');
    const proofFile = formData.get('proof');
    
    let proofBase64 = '';
    if (proofFile && proofFile.size > 0) {
      const buffer = await proofFile.arrayBuffer();
      proofBase64 = Buffer.from(buffer).toString('base64');
    }

    const db = await connectToDB();
    
    const transaction = {
      walletAddress,
      amount,
      purchaseType,
      status: 'pending',
      method: 'manual',
      proofBase64,
      createdAt: new Date()
    };
    
    await db.collection('transactions').insertOne(transaction);
    
    res.status(200).json({ message: 'Deposit submitted for approval' });
  } catch (error) {
    console.error('Manual deposit error:', error);
    res.status(500).json({ error: 'Deposit submission failed' });
  }
}
