const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet, amount, referrer } = req.body;

    if (!wallet || !amount) {
      return res
        .status(400)
        .json({ error: "Wallet and amount required." });
    }

    let user = await db
      .collection("users")
      .findOne({ wallet });
    if (!user)
      return res
        .status(404)
        .json({ error: "User not found." });

    // Set referrer if not already set
    if (referrer && !user.mlm.referrer) {
      await db
        .collection("users")
        .updateOne(
          { wallet },
          { $set: { "mlm.referrer": referrer } },
        );
    }

    // Record purchase
    await db.collection("sales").insertOne({
      wallet,
      amount,
      type: "fixed",
      date: new Date(),
      referrer: referrer || user.mlm.referrer || null,
    });

    // MLM reward logic (simplified: reward referrer 10%)
    if (referrer) {
      await db
        .collection("users")
        .updateOne(
          { wallet: referrer },
          { $inc: { nairaBalance: amount * 0.1 } },
        );
    }

    res
      .status(200)
      .json({
        message:
          "Fixed purchase successful. MLM rewards distributed.",
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
