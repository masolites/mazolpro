import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const settings = await db
      .collection("settings")
      .findOne({});
    res.status(200).json(settings || {});
  } else if (req.method === "POST") {
    const { settings } = req.body;
    await db
      .collection("settings")
      .updateOne({}, { $set: settings }, { upsert: true });
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
