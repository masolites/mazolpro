// netlify/functions/matrix.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet, referralCode } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    // Find referrer and matrix logic here (implement your 1x7, spillover, influencer logic)
    // For now, just log the join
    await db.collection("matrix").insertOne({
      wallet,
      referralCode,
      joinedAt: new Date(),
    });

    client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Joined matrix." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
