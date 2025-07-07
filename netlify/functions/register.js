// netlify/functions/register.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet, email, referralCode } = JSON.parse(
      event.body,
    );

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    // Check if user exists
    let user = await db
      .collection("users")
      .findOne({ wallet });
    if (user) {
      client.close();
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "User already exists.",
        }),
      };
    }

    // Create user
    await db.collection("users").insertOne({
      wallet,
      email,
      referralCode,
      joinedAt: new Date(),
      isGold: false,
      hasPurchased: false,
    });

    client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User registered." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
