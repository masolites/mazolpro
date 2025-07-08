const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  const totalSold = await db
    .collection("sales")
    .aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])
    .toArray();
  client.close();
  res.status(200).json({
    totalSold: totalSold[0]?.total || 0,
    goal: 1000000,
    endTime: "2025-10-01T23:59:59Z",
    tokenPrice: 0.001,
  });
};
