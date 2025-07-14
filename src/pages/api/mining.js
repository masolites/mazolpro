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
      return res
        .status(404)
        .json({ error: "User not found." });
    }

    // Check if mining session is within last 24 hours
    const now = new Date();
    let lastSession = user.mining?.lastSession
      ? new Date(user.mining.lastSession)
      : null;
    let canMine =
      !lastSession ||
      now - lastSession > 24 * 60 * 60 * 1000;

    if (canMine) {
      await db
        .collection("users")
        .updateOne(
          { wallet },
          {
            $set: {
              "mining.lastSession": now,
              "mining.speed": 1,
            },
          },
        );
      return res
        .status(200)
        .json({
          message: "Mining started!",
          session: { start: now, speed: 1 },
        });
    } else {
      return res
        .status(200)
        .json({
          message: "Mining already in progress.",
          session: {
            start: lastSession,
            speed: user.mining.speed,
          },
        });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
