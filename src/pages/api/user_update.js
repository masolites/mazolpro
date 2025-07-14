// pages/api/user_update.js

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
    if (pin !== undefined) {
      if (!/^\d{4}$/.test(pin)) {
        return res
          .status(400)
          .json({ error: "PIN must be exactly 4 digits." });
      }
      update.pin = await bcrypt.hash(pin, 10);
    }

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ error: "No update fields provided." });
    }

    await db
      .collection("users")
      .updateOne({ wallet }, { $set: update });

    // Return updated user (without PIN)
    const user = await db
      .collection("users")
      .findOne({ wallet });
    if (user.pin !== undefined) delete user.pin;

    res
      .status(200)
      .json({ user, message: "User updated." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
