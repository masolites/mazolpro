 const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const uri = process.env.MONGODB_URI;
const JWT_SECRET =
  process.env.JWT_SECRET || "mazolpro_secret";

module.exports = async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const db = client.db();
    const users = db.collection("users");

    if (req.method === "POST") {
      const { action, email, password, token } =
        req.body || {};

      if (action === "register") {
        if (!email || !password) {
          return res
            .status(400)
            .json({
              error: "Email and password required.",
            });
        }
        const existing = await users.findOne({ email });
        if (existing) {
          return res
            .status(400)
            .json({ error: "Email already registered." });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = {
          email,
          password: hash,
          createdAt: new Date(),
          nairaBalance: 0,
          usdtBalance: 0,
          hasPurchased: false,
          isGold: false,
        };
        await users.insertOne(user);
        const jwtToken = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res
          .status(200)
          .json({ user: { email }, token: jwtToken });
      }

      if (action === "login") {
        if (!email || !password) {
          return res
            .status(400)
            .json({
              error: "Email and password required.",
            });
        }
        const user = await users.findOne({ email });
        if (!user) {
          return res
            .status(404)
            .json({ error: "User not found." });
        }
        const valid = await bcrypt.compare(
          password,
          user.password,
        );
        if (!valid) {
          return res
            .status(401)
            .json({ error: "Invalid password." });
        }
        const jwtToken = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res
          .status(200)
          .json({ user: { email }, token: jwtToken });
      }

      if (action === "getUser") {
        if (!token) {
          return res
            .status(401)
            .json({ error: "No token provided." });
        }
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          const user = await users.findOne(
            { email: decoded.email },
            { projection: { password: 0 } },
          );
          if (!user)
            return res
              .status(404)
              .json({ error: "User not found." });
          return res.status(200).json({ user });
        } catch {
          return res
            .status(401)
            .json({ error: "Invalid token." });
        }
      }

      return res
        .status(400)
        .json({ error: "Invalid action." });
    }

    return res
      .status(405)
      .json({ error: "Method not allowed." });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error: " + err.message });
  } finally {
    if (client) client.close();
  }
};
