import { initDatabase } from '../../lib/dbInit';

export default async function handler(req, res) {
  try {
    const db = await initDatabase();
    const user = await db.collection('users').findOne({ id: 'demo-user' }) || {
      id: 'demo-user',
      tokens: 0,
      stage: 1,
      isBuyer: false
    };
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
