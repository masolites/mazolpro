// pages/api/purchase.js
import { ThirdwebSDK } from "thirdweb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed" });
  }

  try {
    const { walletAddress, amount } = req.body;

    const sdk = new ThirdwebSDK("binance", {
      clientId: process.env.THIRDWEB_CLIENT_ID,
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    const contract = await sdk.getContract(
      process.env.MZLx_TOKEN_CONTRACT,
    );
    const tokens = amount * 1000; // 1 NGN = 1000 tokens

    const tx = await contract.erc20.transfer(
      walletAddress,
      tokens,
    );

    return res.status(200).json({
      message: `Success! ${tokens.toLocaleString()} MZLx tokens sent`,
      txHash: tx.transactionHash,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    return res.status(500).json({
      message: "Transaction failed",
      error: error.message,
    });
  }
}
