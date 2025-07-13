import { getDb } from "../../../lib/mongodb";
import { sendTokens } from "../../../lib/thirdweb";
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { depositId } = req.body;
  const db = await getDb();
  const deposit = await db
    .collection("deposits")
    .findOne({ _id: depositId });
  if (!deposit || deposit.status !== "pending")
    return res
      .status(400)
      .json({ error: "Invalid deposit" });

  // Credit tokens to user
  await sendTokens(deposit.wallet, deposit.amount); // Adjust for token decimals

  // Update deposit status
  await db
    .collection("deposits")
    .updateOne(
      { _id: depositId },
      {
        $set: {
          status: "approved",
          approvedAt: new Date(),
        },
      },
    );

  // If fixed amount, trigger MLM logic (see below)
  if (deposit.amount === 1000) {
    // Call MLM logic here (see below)
  }

  res
    .status(200)
    .json({
      message: "Deposit approved and tokens credited.",
    });
}
