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
  const user = await db
    .collection("users")
    .findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(
    password,
    user.password,
  );
  if (!valid)
    return res
      .status(401)
      .json({ error: "Invalid credentials" });

  // For MVP, just return success (add JWT/session in production)
  res
    .status(200)
    .json({ success: true, email: user.email });
}
