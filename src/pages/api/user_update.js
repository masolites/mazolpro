const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet, email, pin } = req.body;

    if (!wallet) {
      return res
        .status(400)
        .json({ error: "Wallet address required." });
    }

    let update = {};
    if (email) update.email = email;
    if (pin) update.pin = await bcrypt.hash(pin, 10);

    await db
      .collection("users")
      .updateOne({ wallet }, { $set: update });
    res.status(200).json({ message: "User updated." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
