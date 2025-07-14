// pages/api/verify_pin.js

const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet, pin } = req.body;

    if (!wallet || !pin) {
      return res
        .status(400)
        .json({ error: "Wallet and PIN required." });
    }

    const user = await db
      .collection("users")
      .findOne({ wallet });

    if (!user || !user.pin) {
      return res
        .status(404)
        .json({ error: "User or PIN not found." });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Incorrect PIN." });
    }

    // Success: PIN is correct
    res
      .status(200)
      .json({ success: true, message: "PIN verified." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
