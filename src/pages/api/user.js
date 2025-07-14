 const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet } = req.body;

    if (!wallet) {
      return res
        .status(400)
        .json({ error: "Wallet address required." });
    }

    let user = await db
      .collection("users")
      .findOne({ wallet });
    if (!user) {
      await db.collection("users").insertOne({
        wallet,
        email: "",
        pin: "",
        nairaBalance: 0,
        usdtBalance: 0,
        createdAt: new Date(),
        mining: { lastSession: null, speed: 1 },
        mlm: { referrer: null, stage: 1, matrix: [] },
        affiliate: { referredBy: null, totalEarned: 0 },
      });
      user = await db
        .collection("users")
        .findOne({ wallet });
    }

    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
