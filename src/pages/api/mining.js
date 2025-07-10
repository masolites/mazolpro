const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  const user = await db
    .collection("users")
    .findOne({ wallet });
  if (!user) {
    client.close();
    return res
      .status(404)
      .json({ error: "User not found" });
  }
  const speed = user.isGold ? 3 : 1;
  const session = {
    wallet,
    start: new Date(),
    speed,
    status: "active",
  };
  await db.collection("mining").insertOne(session);
  client.close();
  res.status(200).json({
    message: `Mining started at ${speed === 3 ? "Gold 🥇" : "Silver 🥈"} speed.`,
    session,
  });
}
