const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, counterparty, amount, product } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  await db.collection("escrow").insertOne({
    wallet,
    counterparty,
    amount,
    product,
    status: "pending",
    createdAt: new Date(),
  });
  client.close();
  res.status(200).json({ message: "Escrow created." });
}
