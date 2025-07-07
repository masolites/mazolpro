// pages/api/sale/fixed.js
import clientPromise from "../../../lib/mongodb";
import { token } from "../../../lib/thirdweb";
import { verifyFlutterwavePayment } from "../../../lib/flutterwave";
import { getSession } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getSession(req);
  if (!session)
    return res.status(401).json({ error: "Unauthorized" });

  const { amount, paymentType, txRef } = req.body;
  const client = await clientPromise;
  const db = client.db();

  // 1. Verify payment (Flutterwave or manual approval)
  let paymentVerified = false;
  if (paymentType === "flutterwave") {
    const result = await verifyFlutterwavePayment(txRef);
    paymentVerified = result.status === "success";
  } else if (paymentType === "manual") {
    // Wait for admin approval (handled elsewhere)
    paymentVerified = false;
  }

  if (!paymentVerified) {
    return res
      .status(400)
      .json({ error: "Payment not verified" });
  }

  // 2. Credit user with MAZOL tokens
  await token.transfer(session.user.wallet, amount);

  // 3. Update user status (Gold mining, matrix, etc.)
  // ... (update DB)

  res
    .status(200)
    .json({
      success: true,
      message: "Purchase successful",
    });
}
