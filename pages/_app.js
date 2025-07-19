// /pages/_app.js

import { ThirdwebProvider } from "thirdweb/react";
import { walletConnectWallet, inAppWallet } from "thirdweb/wallets";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      wallets={[
        walletConnectWallet(), // Supports MetaMask and other WalletConnect wallets
        inAppWallet({
          // Add your in-app wallet config here if needed
        }),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
