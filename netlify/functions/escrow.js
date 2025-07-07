// netlify/functions/escrow.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const {
      action,
      wallet,
      counterparty,
      amount,
      escrowId,
      adminAction,
    } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    if (action === "create") {
      // Create new escrow
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
        body: JSON.stringify({
          message: "Escrow created.",
        }),
      };
    }

    if (action === "release") {
      // Release funds (by counterparty or admin)
      await db
        .collection("escrow")
        .updateOne(
          { _id: escrowId },
          {
            $set: {
              status: "released",
              releasedAt: new Date(),
            },
          },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Escrow released.",
        }),
      };
    }

    if (action === "dispute") {
      // Mark as disputed
      await db
        .collection("escrow")
        .updateOne(
          { _id: escrowId },
          {
            $set: {
              status: "disputed",
              disputedAt: new Date(),
            },
          },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Escrow disputed. Admin will review.",
        }),
      };
    }

    if (action === "adminResolve") {
      // Admin resolves dispute
      await db
        .collection("escrow")
        .updateOne(
          { _id: escrowId },
          {
            $set: {
              status: adminAction,
              adminResolvedAt: new Date(),
            },
          },
        );
      client.close();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Escrow ${adminAction} by admin.`,
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
