import { connectToDB } from "../../../lib/db";
import { ThirdwebSDK } from "thirdweb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  }

  // Flutterwave sends JSON, not formData
  const event = req.body;

  // Verify webhook signature (optional but recommended)
  // const signature = req.headers['verif-hash'];
  // if (signature !== process.env.FLW_WEBHOOK_SECRET) {
  //   return res.status(401).json({ error: "Invalid signature" });
  // }

  if (
    event.event === "charge.completed" &&
    event.data.status === "successful"
  ) {
    const txRef = event.data.tx_ref;
    const amount = event.data.amount;
    const meta = event.data.meta || {};
    const walletAddress = meta.walletAddress;

    if (!walletAddress) {
      return res
        .status(400)
        .json({ error: "No wallet address in metadata" });
    }

    try {
      // Mark transaction as complete in DB
      const db = await connectToDB();
      await db
        .collection("transactions")
        .updateOne(
          { "meta.tx_ref": txRef },
          {
            $set: {
              status: "completed",
              completedAt: new Date(),
            },
          },
        );

      // Send tokens to user
      const sdk = new ThirdwebSDK({
        chain: "binance",
        clientId: process.env.THIRDWEB_CLIENT_ID,
        secretKey: process.env.PLATFORM_WALLET_PRIVATE_KEY,
      });
      const contract = await sdk.getContract(
        process.env.MAZOL_TOKEN_ADDRESS,
      );
      const decimals = 18;
      const amountWithDecimals = (
        BigInt(amount) *
        10n ** BigInt(decimals)
      ).toString();
      await contract.erc20.transfer(
        walletAddress,
        amountWithDecimals,
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Webhook token transfer error:", error);
      return res
        .status(500)
        .json({
          error: error.message || "Token transfer failed",
        });
    }
  }

  res.status(200).json({ received: true });
}
