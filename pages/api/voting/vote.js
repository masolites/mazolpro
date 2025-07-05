import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, price } = req.body;
  if (!email || !price)
    return res
      .status(400)
      .json({ error: "Missing fields" });

  const { db } = await connectToDatabase();
  await db.collection("votes").insertOne({
    email,
    price,
    createdAt: new Date(),
  });

  res.status(201).json({ success: true });
}
