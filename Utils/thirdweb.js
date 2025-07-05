import { ThirdwebSDK } from "thirdweb";
import { PrivateKeyWallet } from "thirdweb/wallets";

export function getThirdwebSDK() {
  return new ThirdwebSDK(
    new PrivateKeyWallet(
      process.env.THIRDWEB_ADMIN_PRIVATE_KEY,
    ),
    { chainId: 56 }, // BNB Smart Chain
  );
}
