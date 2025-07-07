// pages/api/mining/start.js
import clientPromise from "../../../lib/mongodb";
import { getSession } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getSession(req);
  if (!session)
    return res.status(401).json({ error: "Unauthorized" });

  const client = await clientPromise;
  const db = client.db();

  // Start mining session for user
  await db.collection("mining").insertOne({
    userId: session.user._id,
    start: new Date(),
    speed: session.user.isGold ? 3 : 1,
    status: "active",
  });

  res
    .status(200)
    .json({ success: true, message: "Mining started" });
}
