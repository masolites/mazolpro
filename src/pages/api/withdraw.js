const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet, amount, pin } = req.body;

    if (!wallet || !amount || !pin) {
      return res
        .status(400)
        .json({
          error: "Wallet, amount, and PIN required.",
        });
    }

    let user = await db
      .collection("users")
      .findOne({ wallet });
    if (!user || !user.pin) {
      return res
        .status(403)
        .json({ error: "PIN not set." });
    }

    const valid = await bcrypt.compare(pin, user.pin);
    if (!valid) {
      return res
        .status(401)
        .json({ error: "Invalid PIN." });
    }

    if (user.nairaBalance < amount) {
      return res
        .status(400)
        .json({ error: "Insufficient balance." });
    }

    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { nairaBalance: -parseFloat(amount) } },
      );

    res
      .status(200)
      .json({ message: "Withdrawal successful." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
