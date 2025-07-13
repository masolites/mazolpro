import { getDb } from "../../lib/mongodb";
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { amount, wallet } = req.body;
  // 1. Create Flutterwave payment link (use test/live key from env)
  // 2. Store transaction in DB with status "pending"
  // 3. Return payment link to frontend
  // (Pseudo-code, replace with actual Flutterwave API call)
  const paymentLink = "https://flutterwave.com/pay/xxxx";
  const db = await getDb();
  await db.collection("transactions").insertOne({
    wallet,
    amount,
    type: "flutterwave",
    status: "pending",
    createdAt: new Date(),
  });
  res.status(200).json({ paymentLink });
}
