import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, boostType } = req.body;
  if (!email || !boostType)
    return res
      .status(400)
      .json({ error: "Missing fields" });

  const { db } = await connectToDatabase();
  await db.collection("mining_boosts").insertOne({
    email,
    boostType,
    createdAt: new Date(),
  });

  res.status(201).json({ success: true });
}
