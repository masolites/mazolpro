import { ThirdwebSDK } from "thirdweb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { walletAddress, nairaAmount, paymentMethod } = req.body;

    // Calculate tokens (1 NGN = 1000 tokens)
    const tokensToSend = nairaAmount * 1000;

    const sdk = new ThirdwebSDK("binance", {
      clientId: "71e20f4fe4537525ee7c766d094b27b1",
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    const contract = await sdk.getContract(process.env.MZLx_TOKEN_CONTRACT);

    const tx = await contract.erc20.transfer(walletAddress, tokensToSend);

    return res.status(200).json({ 
      success: true, 
      txHash: tx.transactionHash,
      message: `${tokensToSend.toLocaleString()} MZLx tokens sent to your wallet`
    });
  } catch (error) {
    console.error("Token transfer error:", error);
    return res.status(500).json({ 
      error: "Token transfer failed",
      details: error.message 
    });
  }
}
