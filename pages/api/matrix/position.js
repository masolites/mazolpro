import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { email } = req.query;
  if (!email)
    return res.status(400).json({ error: "Missing email" });

  const { db } = await connectToDatabase();
  const positions = await db
    .collection("matrix_positions")
    .find({ email })
    .toArray();

  res.status(200).json({ positions });
}
