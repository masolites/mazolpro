// netlify/functions/mining.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();
    const user = await db
      .collection("users")
      .findOne({ wallet });

    const speed = user && user.isGold ? 3 : 1;
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
        message: `Mining started at ${speed}x speed.`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
