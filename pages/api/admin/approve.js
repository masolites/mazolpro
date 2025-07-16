 import { connectToDB } from "../../../lib/db";
import { ObjectId } from "mongodb";
import { ThirdwebSDK } from "thirdweb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  }

  const { id } = req.body;

  try {
    const db = await connectToDB();
    const transaction = await db
      .collection("transactions")
      .findOne({ _id: new ObjectId(id) });

    if (!transaction) {
      return res
        .status(404)
        .json({ error: "Transaction not found" });
    }

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
      BigInt(transaction.amount) *
      10n ** BigInt(decimals)
    ).toString();
    await contract.erc20.transfer(
      transaction.walletAddress,
      amountWithDecimals,
    );

    // Mark transaction as approved
    await db
      .collection("transactions")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status: "approved",
            approvedAt: new Date(),
          },
        },
      );

    // Optionally update user balance in DB
    await db.collection("users").updateOne(
      { walletAddress: transaction.walletAddress },
      {
        $inc: {
          balance: transaction.amount,
          tokens:
            transaction.purchaseType === "fixed"
              ? 1000
              : transaction.amount,
        },
      },
      { upsert: true },
    );

    res
      .status(200)
      .json({
        message: "Deposit approved and tokens sent",
      });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ error: "Approval failed" });
  }
}
