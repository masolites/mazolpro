import { ThirdwebSDK } from "thirdweb";
import { NextApiRequest, NextApiResponse } from "next";

// Only allow POST requests
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  }

  const { recipient, amount } = req.body;

  if (!recipient || !amount) {
    return res
      .status(400)
      .json({ error: "Recipient and amount are required" });
  }

  try {
    // Initialize thirdweb SDK for BSC mainnet
    const sdk = new ThirdwebSDK({
      chain: "binance",
      clientId: process.env.THIRDWEB_CLIENT_ID,
      secretKey: process.env.PLATFORM_WALLET_PRIVATE_KEY,
    });

    // Get the token contract
    const contract = await sdk.getContract(
      process.env.MAZOL_TOKEN_ADDRESS,
    );

    // Send tokens (amount should be in token's smallest unit, e.g., 18 decimals)
    // If your token uses 18 decimals, convert amount to string with 18 decimals
    // Example: 1000 tokens => "1000000000000000000000"
    const decimals = 18; // Update if your token uses a different decimal
    const amountWithDecimals = (
      BigInt(amount) *
      10n ** BigInt(decimals)
    ).toString();

    const tx = await contract.erc20.transfer(
      recipient,
      amountWithDecimals,
    );

    res
      .status(200)
      .json({
        success: true,
        txHash: tx.receipt.transactionHash,
      });
  } catch (error) {
    console.error("Token transfer error:", error);
    res
      .status(500)
      .json({
        error: error.message || "Token transfer failed",
      });
  }
}
