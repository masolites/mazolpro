// netlify/functions/purchase_fixed.js
const { ThirdwebSDK } = require("thirdweb");
const sdk = new ThirdwebSDK("binance");
const token = sdk.getToken(process.env.MAZOL_TOKEN_ADDRESS);

exports.handler = async function (event, context) {
  const { amount } = JSON.parse(event.body);
  // TODO: Add payment verification, matrix logic, mining upgrade, etc.
  // Example: Send tokens to user (replace with real wallet)
  await token.transfer(
    "0x0000000000000000000000000000000000000000",
    amount,
  );
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Purchase successful (fixed amount)",
    }),
  };
};
