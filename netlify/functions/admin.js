// netlify/functions/admin.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { action, wallet, fee } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    if (action === "approveDeposit") {
      await db
        .collection("deposits")
        .updateOne(
          { wallet, status: "pending" },
          {
            $set: {
              status: "approved",
              approvedAt: new Date(),
            },
          },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Deposit approved.",
        }),
      };
    }

    if (action === "setWithdrawalFee") {
      await db
        .collection("settings")
        .updateOne(
          { key: "withdrawalFee" },
          { $set: { value: parseFloat(fee) } },
          { upsert: true },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Withdrawal fee updated.",
        }),
      };
    }

    client.close();
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Unknown admin action.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
