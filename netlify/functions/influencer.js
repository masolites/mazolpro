// netlify/functions/influencer.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { action, wallet, influencerWallet } = JSON.parse(
      event.body,
    );

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    if (action === "assign") {
      // Assign influencer status to a user
      await db
        .collection("users")
        .updateOne(
          { wallet: influencerWallet },
          { $set: { influencer: true } },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Influencer assigned.",
        }),
      };
    }

    if (action === "remove") {
      // Remove influencer status
      await db
        .collection("users")
        .updateOne(
          { wallet: influencerWallet },
          { $set: { influencer: false } },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Influencer removed.",
        }),
      };
    }

    client.close();
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Unknown action." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
