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
  if (parseInt(amount) < 200)
    return res
      .status(400)
      .json({ error: "Minimum flexible buy is ₦200" });

  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  await db
    .collection("users")
    .updateOne(
      { wallet },
      { $set: { isGold: true, hasPurchased: true } },
    );

  await token.transfer(wallet, amount / 0.001); // $0.001/token

  client.close();
  res
    .status(200)
    .json({
      message:
        "Flexible token purchase successful, mining upgraded.",
    });
};
