const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  const { action, wallet, email } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();

  if (action === "register") {
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
    return res
      .status(200)
      .json({ message: "Signup successful" });
  }

  if (action === "login") {
    const user = await db
      .collection("users")
      .findOne({ $or: [{ wallet }, { email }] });
    client.close();
    if (!user)
      return res
        .status(404)
        .json({ error: "User not found" });
    return res
      .status(200)
      .json({ message: "Login successful", user });
  }

  client.close();
  res.status(400).json({ error: "Invalid auth action." });
};
