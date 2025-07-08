const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, price } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  const user = await db
    .collection("users")
    .findOne({ wallet });
  if (!user || !user.hasPurchased) {
    client.close();
    return res
      .status(403)
      .json({ error: "Only buyers can vote." });
  }
  await db
    .collection("votes")
    .insertOne({ wallet, price, timestamp: new Date() });
  client.close();
  res.status(200).json({ message: "Vote recorded." });
};
