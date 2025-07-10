 const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { action, wallet, email, password } =
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
    if (!password || password.length < 6) {
      client.close();
      return res
        .status(400)
        .json({
          error: "Password must be at least 6 characters",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({
      wallet,
      email,
      password: hashedPassword,
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
    if (!user) {
      client.close();
      return res
        .status(404)
        .json({ error: "User not found" });
    }
    // Check password
    const valid = await bcrypt.compare(
      password || "",
      user.password || "",
    );
    client.close();
    if (!valid) {
      return res
        .status(401)
        .json({ error: "Invalid password" });
    }
    // Don't send password back to frontend
    const { password: _, ...userSafe } = user;
    return res
      .status(200)
      .json({
        message: "Login successful",
        user: userSafe,
      });
  }

  client.close();
  res.status(400).json({ error: "Invalid auth action." });
};
