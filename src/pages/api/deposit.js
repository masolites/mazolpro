import { getDb } from "../../lib/mongodb";
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { amount, wallet, method, proof } = req.body;
  const db = await getDb();
  await db.collection("deposits").insertOne({
    wallet,
    amount,
    method,
    proof,
    status: "pending",
    createdAt: new Date(),
  });
  res
    .status(200)
    .json({
      message: "Deposit submitted, pending admin approval.",
    });
}
