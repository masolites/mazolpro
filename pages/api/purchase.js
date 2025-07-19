 import { ThirdwebSDK } from "thirdweb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { walletAddress, amount } = req.body;
    if (!walletAddress || !amount) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const sdk = new ThirdwebSDK("binance", {
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    const contract = await sdk.getContract(process.env.MZLX_TOKEN_CONTRACT);
    const tokens = Number(amount) * 1000; // 1 NGN = 1000 tokens

    const tx = await contract.erc20.transfer(walletAddress, tokens);

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
