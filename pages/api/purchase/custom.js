 import { connectToDatabase } from "../../lib/mongodb";
import Flutterwave from "flutterwave-node-v3";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  }

  const { address, amount } = req.body;
  if (!address || !amount) {
    return res
      .status(400)
      .json({
        error: "Wallet address and amount are required",
      });
  }

  if (amount < 200) {
    return res
      .status(400)
      .json({ error: "Minimum purchase is ₦200" });
  }

  const flw = new Flutterwave(
    process.env.FLW_PUBLIC_KEY,
    process.env.FLW_SECRET_KEY,
  );

  try {
    // Initialize payment with Flutterwave
    const payload = {
      tx_ref: `custom-${Date.now()}-${address}`,
      amount: amount,
      currency: "NGN",
      payment_options: "card,ussd,banktransfer",
      customer: {
        email: "user@example.com", // Replace with real user email in production
      },
      customizations: {
        title: "MAZOL Custom Purchase",
        description: `Purchase of ₦${amount} MAZOL Tokens`,
      },
      meta: {
        wallet_address: address,
        purchase_type: "custom",
      },
    };

    const response = await flw.Payment.initialize(payload);

    // Calculate tokens (₦1 = 1 token)
    const tokens = amount;

    // In production: Store transaction in DB with status 'pending'
    // const { db } = await connectToDatabase();
    // await db.collection('transactions').insertOne({
    //   ...payload,
    //   tokens,
    //   status: 'pending',
    //   createdAt: new Date(),
    // });

    res.status(200).json({
      success: true,
      paymentLink: response.data.link,
      tokens,
    });
  } catch (error) {
    console.error("Flutterwave error:", error);
    res
      .status(500)
      .json({ error: "Payment initialization failed" });
  }
}
