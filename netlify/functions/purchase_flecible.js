// netlify/functions/purchase_flexible.js
const { ThirdwebSDK } = require("thirdweb");
const { MongoClient } = require("mongodb");

const sdk = new ThirdwebSDK("binance");
const token = sdk.getToken(process.env.MAZOL_TOKEN_ADDRESS);

exports.handler = async function (event) {
  try {
    const { amount, wallet } = JSON.parse(event.body);

    // TODO: Add payment verification (Flutterwave/manual)
    // For now, assume payment is verified

    // Send tokens to user
    await token.transfer(wallet, amount);

    // Update user in MongoDB (set Gold mining, update matrix, etc.)
    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();
    await db
      .collection("users")
      .updateOne(
        { wallet },
        {
          $set: { isGold: true },
          $inc: { totalPurchased: amount },
        },
        { upsert: true },
      );
    client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Flexible amount purchase successful. Gold mining activated.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
