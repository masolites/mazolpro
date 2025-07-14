 const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const { wallet, amount, method } = req.body;

    if (!wallet || !amount || !method) {
      return res
        .status(400)
        .json({
          error: "Wallet, amount, and method required.",
        });
    }

    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { nairaBalance: parseFloat(amount) } },
      );

    res
      .status(200)
      .json({ message: "Deposit successful." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
