// netlify/functions/withdraw.js
const { ThirdwebSDK } = require("thirdweb");
const { MongoClient } = require("mongodb");

const sdk = new ThirdwebSDK("binance");
const token = sdk.getToken(process.env.MAZOL_TOKEN_ADDRESS);

exports.handler = async function (event) {
  try {
    const { wallet, amount } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();
    const settings = await db
      .collection("settings")
      .findOne({ key: "withdrawalFee" });
    const fee = settings ? settings.value : 0.05; // default 5%
    const netAmount = amount * (1 - fee);

    await token.transfer(wallet, netAmount);

    await db.collection("withdrawals").insertOne({
      wallet,
      amount,
      fee,
      netAmount,
      timestamp: new Date(),
    });
    client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Withdrawal successful.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
