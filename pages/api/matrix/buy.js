import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, amount } = req.body;
  if (!email || !amount)
    return res
      .status(400)
      .json({ error: "Missing fields" });

  const { db } = await connectToDatabase();
  // Each purchase = new matrix position
  await db.collection("matrix_positions").insertOne({
    email,
    amount,
    createdAt: new Date(),
    stage: 1,
    status: "active",
  });

  res.status(201).json({ success: true });
}
