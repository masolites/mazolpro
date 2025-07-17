 import { ThirdwebSDK } from "thirdweb";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { walletAddress, nairaAmount, paymentMethod, paymentReference, paymentDateTime, email } = req.body;

  // Validate required fields
  if (!walletAddress || !nairaAmount) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Calculate tokens to send
  const tokensToSend = nairaAmount * 1000; // Adjust as needed

  // Initialize Thirdweb SDK (server-side only)
  const sdk = new ThirdwebSDK("binance", {
    clientId: process.env.THIRDWEB_CLIENT_ID,
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  });

  const contract = await sdk.getContract(process.env.MZLX_TOKEN_CONTRACT);

  try {
    const tx = await contract.erc20.transfer(walletAddress, tokensToSend);
    return res.status(200).json({ success: true, tx });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Token transfer failed." });
  }
}
