// netlify/functions/matrix.js
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
  try {
    const { wallet, referralCode } = JSON.parse(event.body);

    const client = await MongoClient.connect(
      process.env.MONGODB_URI,
    );
    const db = client.db();

    // 1. Find or create user
    let user = await db
      .collection("users")
      .findOne({ wallet });
    if (!user) {
      user = {
        wallet,
        joinedAt: new Date(),
        stage: 1,
        influencer: false,
      };
      await db.collection("users").insertOne(user);
    }

    // 2. Find referrer (by referralCode)
    let referrer = null;
    if (referralCode) {
      referrer = await db
        .collection("users")
        .findOne({ referralCode });
    }

    // 3. Influencer assignment logic (hard-coded or admin-assigned)
    // Example: If referralCode matches an influencer, assign as influencer
    let influencer = false;
    if (referrer && referrer.influencer) {
      influencer = true;
    }

    // 4. Matrix placement logic (1x7 forced matrix with spillover)
    // Find the matrix node for the referrer or assign to company root if no referrer
    let parentNode =
      referrer ||
      (await db
        .collection("users")
        .findOne({ isCompanyRoot: true }));
    let placed = false;
    let queue = [parentNode];

    while (queue.length && !placed) {
      let node = queue.shift();
      let children = await db
        .collection("matrix")
        .find({ parent: node.wallet })
        .toArray();
      if (children.length < 7) {
        // Place user here
        await db.collection("matrix").insertOne({
          wallet: user.wallet,
          parent: node.wallet,
          stage: 1,
          joinedAt: new Date(),
          influencer,
        });
        placed = true;
      } else {
        // Add children to queue for BFS spillover
        queue.push(...children);
      }
    }

    // 5. If not placed, fallback to company root
    if (!placed) {
      let root = await db
        .collection("users")
        .findOne({ isCompanyRoot: true });
      await db.collection("matrix").insertOne({
        wallet: user.wallet,
        parent: root.wallet,
        stage: 1,
        joinedAt: new Date(),
        influencer,
      });
    }

    // 6. Return placement info
    client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User placed in matrix",
        influencer,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
