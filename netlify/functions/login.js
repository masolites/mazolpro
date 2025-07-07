// netlify/functions/login.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    let user = await db
      .collection("users")
      .findOne({ wallet });
    client.close();

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful.",
        user,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
