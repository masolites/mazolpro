// lib/flutterwave.js
import axios from "axios";

export async function verifyFlutterwavePayment(txRef) {
  const response = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${txRef}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    },
  );
  return response.data;
}
