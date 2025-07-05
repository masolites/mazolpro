import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, amount, currency, method } = req.body;
  if (!email || !amount || !currency || !method)
    return res
      .status(400)
      .json({ error: "Missing fields" });

  const { db } = await connectToDatabase();
  await db.collection("wallet_withdrawals").insertOne({
    email,
    amount,
    currency,
    method,
    status: "pending",
    createdAt: new Date(),
  });

  res.status(201).json({ success: true });
}
