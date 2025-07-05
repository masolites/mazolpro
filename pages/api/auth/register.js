import { connectToDatabase } from "../../../lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: "Missing fields" });

  const { db } = await connectToDatabase();
  const existing = await db
    .collection("users")
    .findOne({ email });
  if (existing)
    return res
      .status(409)
      .json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);
  await db
    .collection("users")
    .insertOne({
      email,
      password: hash,
      createdAt: new Date(),
    });

  res.status(201).json({ success: true });
}
