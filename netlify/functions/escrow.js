// netlify/functions/escrow.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet, amount, counterparty } = JSON.parse(
      event.body,
    );

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    await db.collection("escrow").insertOne({
      wallet,
      counterparty,
      amount,
      status: "pending",
      createdAt: new Date(),
    });

    client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Escrow created." }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
