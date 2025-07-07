// pages/api/wallet/withdraw.js
import clientPromise from "../../../lib/mongodb";
import { token } from "../../../lib/thirdweb";
import { getSession } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getSession(req);
  if (!session)
    return res.status(401).json({ error: "Unauthorized" });

  const { amount } = req.body;
  const client = await clientPromise;
  const db = client.db();

  // Get withdrawal fee from admin settings
  const settings = await db
    .collection("settings")
    .findOne({ key: "withdrawalFee" });
  const fee = settings ? settings.value : 0.05; // default 5%

  const netAmount = amount * (1 - fee);

  // Transfer tokens to user wallet
  await token.transfer(session.user.wallet, netAmount);

  // Log withdrawal
  await db.collection("withdrawals").insertOne({
    userId: session.user._id,
    amount,
    fee,
    netAmount,
    timestamp: new Date(),
  });

  res
    .status(200)
    .json({
      success: true,
      message: "Withdrawal successful",
    });
}
