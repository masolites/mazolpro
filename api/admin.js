const { MongoClient, ObjectId } = require("mongodb");

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "password";

module.exports = async (req, res) => {
  const { action, username, password, user, wallet, id } =
    req.body || JSON.parse(req.body || "{}");
  const client = await MongoClient.connect(
    process.env.MONGODB_URI,
  );
  const db = client.db();

  if (action === "login") {
    if (
      username === ADMIN_USER &&
      password === ADMIN_PASS
    ) {
      client.close();
      return res
        .status(200)
        .json({
          success: true,
          message: "Admin login successful.",
        });
    }
    client.close();
    return res
      .status(403)
      .json({ error: "Invalid admin credentials." });
  }

  if (action === "getUser") {
    const found = await db
      .collection("users")
      .findOne({
        $or: [{ wallet: user }, { email: user }],
      });
    client.close();
    return res.status(200).json({ user: found });
  }

  if (action === "setGold") {
    await db
      .collection("users")
      .updateOne({ wallet }, { $set: { isGold: true } });
    client.close();
    return res
      .status(200)
      .json({ message: "User set to Gold." });
  }

  if (action === "setSilver") {
    await db
      .collection("users")
      .updateOne({ wallet }, { $set: { isGold: false } });
    client.close();
    return res
      .status(200)
      .json({ message: "User set to Silver." });
  }

  if (action === "getPendingDeposits") {
    const deposits = await db
      .collection("deposits")
      .find({ status: "pending" })
      .toArray();
    client.close();
    return res.status(200).json({ deposits });
  }

  if (action === "approveDeposit") {
    await db
      .collection("deposits")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "approved" } },
      );
    // On approval, credit user and send tokens
    const deposit = await db
      .collection("deposits")
      .findOne({ _id: new ObjectId(id) });
    await db
      .collection("users")
      .updateOne(
        { wallet: deposit.wallet },
        {
          $inc: {
            nairaBalance: parseFloat(deposit.amount),
          },
        },
      );
    // Optionally, trigger token transfer here
    client.close();
    return res
      .status(200)
      .json({
        message: "Deposit approved and user credited.",
      });
  }

  if (action === "getPendingWithdrawals") {
    // Implement as needed
    client.close();
    return res.status(200).json({ withdrawals: [] });
  }

  if (action === "approveWithdrawal") {
    // Implement as needed
    client.close();
    return res
      .status(200)
      .json({ message: "Withdrawal approved." });
  }

  client.close();
  res.status(400).json({ error: "Unknown admin action." });
};
