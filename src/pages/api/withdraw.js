const { ThirdwebSDK } = require("thirdweb");
const { MongoClient } = require("mongodb");

const sdk = new ThirdwebSDK("binance");
const token = sdk.getToken(process.env.MAZOL_TOKEN_ADDRESS);

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, amount } =
    req.body || JSON.parse(req.body || "{}");
  // Implement withdrawal logic, deduct from user balance, send token
  await token.transfer(wallet, amount);
  res
    .status(200)
    .json({ message: "Withdrawal successful." });
}
