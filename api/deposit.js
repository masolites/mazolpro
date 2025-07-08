const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, amount, method, proof } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  if (method === "flutterwave" || method === "usdt") {
    // For real payment, verify and credit user
    await db
      .collection("users")
      .updateOne(
        { wallet },
        { $inc: { nairaBalance: parseFloat(amount) } },
      );
    client.close();
    return res
      .status(200)
      .json({ message: "Deposit successful." });
  }
  if (method === "manual") {
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
  client.close();
  res
    .status(400)
    .json({ error: "Invalid deposit method." });
};
