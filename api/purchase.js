const { ThirdwebSDK } = require("thirdweb");
const { MongoClient } = require("mongodb");
const sdk = new ThirdwebSDK("binance");
const token = sdk.getToken(process.env.MAZOL_TOKEN_ADDRESS);

module.exports = async (req, res) => {
  const { type, wallet, amount, method, referral, usdtTx } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();

  if (type === "fixed") {
    // MLM logic, matrix, reward, token transfer, mining upgrade
    // ... (your 1x7 logic here)
    await db
      .collection("matrix")
      .insertOne({
        wallet,
        amount,
        stage: 1,
        joinedAt: new Date(),
      });
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $set: { isGold: true, hasPurchased: true } },
      );
    await token.transfer(wallet, amount / 0.001);
    client.close();
    return res
      .status(200)
      .json({
        message: "Fixed token purchase successful.",
      });
  }

  if (type === "flexible") {
    if (parseInt(amount) < 200)
      return res
        .status(400)
        .json({ error: "Minimum flexible buy is ₦200" });
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $set: { isGold: true, hasPurchased: true } },
      );
    await token.transfer(wallet, amount / 0.001);
    client.close();
    return res
      .status(200)
      .json({
        message: "Flexible token purchase successful.",
      });
  }

  if (type === "usdt") {
    // Verify USDT tx, then transfer tokens
    // ... (your logic here)
    await token.transfer(wallet, amount / 0.001);
    client.close();
    return res
      .status(200)
      .json({ message: "USDT token purchase successful." });
  }

  if (type === "platform") {
    // Deduct from nairaBalance, transfer tokens
    const user = await db
      .collection("users")
      .findOne({ wallet });
    if (!user || user.nairaBalance < amount) {
      client.close();
      return res
        .status(400)
        .json({ error: "Insufficient platform balance." });
    }
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { nairaBalance: -parseFloat(amount) } },
      );
    await token.transfer(wallet, amount / 0.001);
    client.close();
    return res
      .status(200)
      .json({
        message: "Token purchased from platform balance.",
      });
  }

  client.close();
  res.status(400).json({ error: "Invalid purchase type." });
};
