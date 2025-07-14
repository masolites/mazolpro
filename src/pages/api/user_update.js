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
    if (email !== undefined) update.email = email;
    if (pin !== undefined && pin.length === 4)
      update.pin = await bcrypt.hash(pin, 10);

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ error: "No update fields provided." });
    }

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
