import { connectToDB } from '../../../lib/db';
import { uploadToS3 } from '../../../lib/s3';

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
    
    // Upload proof to S3
    let proofUrl = '';
    if (proofFile && proofFile.size > 0) {
      const buffer = await proofFile.arrayBuffer();
      proofUrl = await uploadToS3(Buffer.from(buffer), proofFile.name);
    }

    const db = await connectToDB();
    
    // Create transaction record
    const transaction = {
      walletAddress,
      amount,
      purchaseType,
      status: 'pending',
      method: 'manual',
      proofUrl,
      createdAt: new Date()
    };
    
    await db.collection('transactions').insertOne(transaction);
    
    res.status(200).json({ message: 'Deposit submitted for approval' });
  } catch (error) {
    console.error('Manual deposit error:', error);
    res.status(500).json({ error: 'Deposit submission failed' });
  }
}
