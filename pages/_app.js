// /pages/_app.js

import { ThirdwebProvider } from "thirdweb/react";
import { injectedWallet, inAppWallet } from "thirdweb/wallets";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      wallets={[
        injectedWallet(), // This supports MetaMask and other browser wallets
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
