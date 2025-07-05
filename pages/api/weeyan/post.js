import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, content, videoUrl } = req.body;
  if (!email || !content || !videoUrl)
    return res
      .status(400)
      .json({ error: "Missing fields" });

  const { db } = await connectToDatabase();
  await db.collection("social_posts").insertOne({
    email,
    content,
    videoUrl,
    createdAt: new Date(),
  });

  res.status(201).json({ success: true });
}
