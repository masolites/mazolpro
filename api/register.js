const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, email } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  const exists = await db
    .collection("users")
    .findOne({ $or: [{ wallet }, { email }] });
  if (exists) {
    client.close();
    return res
      .status(400)
      .json({ error: "User already exists" });
  }
  await db.collection("users").insertOne({
    wallet,
    email,
    isGold: false,
    hasPurchased: false,
    nairaBalance: 0,
    usdtBalance: 0,
    createdAt: new Date(),
  });
  client.close();
  res.status(200).json({ message: "Signup successful" });
};
