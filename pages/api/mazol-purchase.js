import { ThirdwebSDK } from "thirdweb";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { walletAddress, nairaAmount, mode } = req.body;

  // 1. (Pseudo) Start and verify Flutterwave payment here
  // In production, you should verify the paymentReference from Flutterwave webhook or client
  // For demo, assume payment is always successful

  // 2. Calculate tokens to send
  let tokensToSend;
  if (mode === "fixed") {
    tokensToSend = 1000 * 1000; // e.g., 1 Naira = 1000 tokens, adjust as needed
  } else {
    tokensToSend = nairaAmount * 1000;
  }

  // 3. Transfer tokens from your wallet to buyer
  const sdk = new ThirdwebSDK("binance", {
    clientId: process.env.THIRDWEB_CLIENT_ID,
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  });
  const contract = await sdk.getContract(
    process.env.MZLX_TOKEN_CONTRACT,
  );

  const tx = await contract.erc20.transfer(
    walletAddress,
    tokensToSend,
  );

  // 4. (Optional) Add MLM/affiliate logic here

  return res.status(200).json({ success: true, tx });
}
