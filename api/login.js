const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, email } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  const user = await db
    .collection("users")
    .findOne({ $or: [{ wallet }, { email }] });
  client.close();
  if (!user)
    return res
      .status(404)
      .json({ error: "User not found" });
  res
    .status(200)
    .json({ message: "Login successful", user });
};
