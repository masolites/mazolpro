import { ThirdwebSDK } from "thirdweb";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    walletAddress,
    nairaAmount,
    paymentMethod,
    paymentReference,
    email,
    paymentDateTime,
  } = req.body;

  // 1. (Pseudo) Start and verify Flutterwave payment here
  // In production, you should verify the paymentReference from Flutterwave webhook or client
  // For demo, assume payment is always successful

  // 2. Calculate tokens to send
  let tokensToSend = nairaAmount * 1000; // Adjust as needed

  // 3. Transfer tokens from your wallet to buyer
  const sdk = new ThirdwebSDK("binance", {
    clientId: "23ca42a52fded0d2d5adb5f79c92030e", // Hardcoded for reliability
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
