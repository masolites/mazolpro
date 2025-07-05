import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { db } = await connectToDatabase();
  const voting = await db
    .collection("voting")
    .findOne({}, { sort: { createdAt: -1 } });

  res.status(200).json({
    currentPrice: voting?.currentPrice || "₦1.4",
    votingWindow: voting?.votingWindow || "6pm–11pm WAT",
    nextPrice: voting?.nextPrice || "To be announced",
    canVote: voting?.canVote || false,
  });
}
