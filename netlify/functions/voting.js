// netlify/functions/voting.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet, price } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();
    const user = await db
      .collection("users")
      .findOne({ wallet });

    if (!user || !user.hasPurchased) {
      client.close();
      return {
        statusCode: 403,
        body: JSON.stringify({
          error: "Not eligible to vote.",
        }),
      };
    }

    await db.collection("votes").insertOne({
      wallet,
      price,
      timestamp: new Date(),
    });
    client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Vote recorded." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
