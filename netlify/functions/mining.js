 const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  const { wallet } = JSON.parse(event.body);
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();
  let user = await db
    .collection("users")
    .findOne({ wallet });
  if (!user) {
    client.close();
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "User not found" }),
    };
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
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Mining started at ${speed === 3 ? "Gold 🥇" : "Silver 🥈"} speed.`,
      session,
    }),
  };
};
