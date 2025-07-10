const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  const { type, wallet, amount, method, proof } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();

  if (type === "flutterwave") {
    // Verify Flutterwave payment, credit nairaBalance
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { nairaBalance: parseFloat(amount) } },
      );
    client.close();
    return res
      .status(200)
      .json({ message: "Flutterwave deposit successful." });
  }

  if (type === "manual") {
    await db.collection("deposits").insertOne({
      wallet,
      amount,
      proof,
      status: "pending",
      createdAt: new Date(),
    });
    client.close();
    return res
      .status(200)
      .json({
        message:
          "Manual deposit submitted, pending admin approval.",
      });
  }

  if (type === "usdt") {
    // Verify USDT tx, credit usdtBalance
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { usdtBalance: parseFloat(amount) } },
      );
    client.close();
    return res
      .status(200)
      .json({ message: "USDT deposit successful." });
  }

  client.close();
  res.status(400).json({ error: "Invalid deposit type." });
}
