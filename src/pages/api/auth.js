 import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const JWT_SECRET =
  process.env.JWT_SECRET || "mazolpro_secret";

export default async function handler(req, res) {
  // Dynamically import bcryptjs and jsonwebtoken for Vercel compatibility
  const bcrypt = (await import("bcryptjs")).default;
  const jwt = (await import("jsonwebtoken")).default;

  const client = await MongoClient.connect(uri);
  const db = client.db();
  const users = db.collection("users");

  if (req.method === "POST") {
    const { action, email, password } = req.body;

    if (action === "register") {
      if (!email || !password) {
        client.close();
        return res
          .status(400)
          .json({ error: "Email and password required." });
      }
      const existing = await users.findOne({ email });
      if (existing) {
        client.close();
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
      const token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: "7d",
      });
      client.close();
      return res
        .status(200)
        .json({ user: { email }, token });
    }

    if (action === "login") {
      if (!email || !password) {
        client.close();
        return res
          .status(400)
          .json({ error: "Email and password required." });
      }
      const user = await users.findOne({ email });
      if (!user) {
        client.close();
        return res
          .status(404)
          .json({ error: "User not found." });
      }
      const valid = await bcrypt.compare(
        password,
        user.password,
      );
      if (!valid) {
        client.close();
        return res
          .status(401)
          .json({ error: "Invalid password." });
      }
      const token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: "7d",
      });
      client.close();
      return res
        .status(200)
        .json({ user: { email }, token });
    }

    if (action === "getUser") {
      const { token } = req.body;
      if (!token) {
        client.close();
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
        client.close();
        if (!user)
          return res
            .status(404)
            .json({ error: "User not found." });
        return res.status(200).json({ user });
      } catch {
        client.close();
        return res
          .status(401)
          .json({ error: "Invalid token." });
      }
    }

    client.close();
    return res
      .status(400)
      .json({ error: "Invalid action." });
  }

  client.close();
  res.status(405).json({ error: "Method not allowed." });
}
