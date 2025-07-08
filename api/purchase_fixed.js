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
  if (parseInt(amount) !== 1000)
    return res
      .status(400)
      .json({ error: "Fixed buy is ₦1000 only" });

  // MLM logic: Place user in matrix, calculate rewards, update DB (simplified)
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  // Place user in matrix, calculate rewards, etc. (implement your 1x7 logic here)
  await db
    .collection("matrix")
    .insertOne({
      wallet,
      amount,
      stage: 1,
      joinedAt: new Date(),
    });

  // Mark user as buyer, upgrade mining speed
  await db
    .collection("users")
    .updateOne(
      { wallet },
      { $set: { isGold: true, hasPurchased: true } },
    );

  // Token transfer
  await token.transfer(wallet, amount / 0.001); // $0.001/token, so 1000/0.001 = 1,000,000 tokens

  client.close();
  res
    .status(200)
    .json({
      message:
        "Token purchased, MLM rewards processed, mining upgraded.",
    });
};
