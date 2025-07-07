// pages/api/voting/vote.js
import clientPromise from "../../../lib/mongodb";
import { getSession } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getSession(req);
  if (!session)
    return res.status(401).json({ error: "Unauthorized" });

  const { price } = req.body;
  const client = await clientPromise;
  const db = client.db();

  // Only allow if user is a token buyer
  const user = await db
    .collection("users")
    .findOne({ _id: session.user._id });
  if (!user.hasPurchased) {
    return res
      .status(403)
      .json({ error: "Not eligible to vote" });
  }

  // Save vote
  await db.collection("votes").insertOne({
    userId: session.user._id,
    price,
    timestamp: new Date(),
  });

  res
    .status(200)
    .json({ success: true, message: "Vote recorded" });
}
