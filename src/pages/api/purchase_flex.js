const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet, amount, affiliate } = req.body;

    if (!wallet || !amount) {
      return res
        .status(400)
        .json({ error: "Wallet and amount required." });
    }

    await db.collection("sales").insertOne({
      wallet,
      amount,
      type: "flexible",
      date: new Date(),
      affiliate: affiliate || null,
    });

    // Affiliate reward logic (buyer gets 1%, affiliate gets 2%)
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { nairaBalance: amount * 0.01 } },
      );
    if (affiliate) {
      await db
        .collection("users")
        .updateOne(
          { wallet: affiliate },
          {
            $inc: {
              nairaBalance: amount * 0.02,
              "affiliate.totalEarned": amount * 0.02,
            },
          },
        );
    }

    res
      .status(200)
      .json({
        message:
          "Flexible purchase successful. Affiliate rewards distributed.",
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
p
