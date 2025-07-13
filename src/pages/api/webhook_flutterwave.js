import { getDb } from "../../lib/mongodb";
import { sendTokens } from "../../lib/thirdweb";
export default async function handler(req, res) {
  // Validate Flutterwave webhook signature!
  const { data } = req.body;
  if (data.status === "successful") {
    const db = await getDb();
    await db
      .collection("transactions")
      .updateOne(
        {
          wallet: data.customer.wallet,
          amount: data.amount,
          status: "pending",
        },
        {
          $set: {
            status: "approved",
            approvedAt: new Date(),
          },
        },
      );
    await sendTokens(data.customer.wallet, data.amount); // Adjust for decimals
    // If fixed, trigger MLM logic
  }
  res.status(200).json({ status: "ok" });
}
