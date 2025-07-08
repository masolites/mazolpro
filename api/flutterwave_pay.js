const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed" });
  const { wallet, amount } =
    req.body || JSON.parse(req.body || "{}");
  // Initiate payment with Flutterwave API (see their docs for full implementation)
  // This is a placeholder for you to fill in with your real Flutterwave logic
  res
    .status(200)
    .json({
      message:
        "Flutterwave payment initiated. (Implement full logic here)",
    });
};
