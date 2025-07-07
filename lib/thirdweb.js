// lib/thirdweb.js
import { ThirdwebSDK } from "thirdweb";
const sdk = new ThirdwebSDK("binance"); // BNB Smart Chain

export const token = sdk.getToken(
  process.env.MAZOL_TOKEN_ADDRESS,
);
export const wallet = sdk.wallet;
