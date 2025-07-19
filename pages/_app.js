// /pages/_app.js

import { ThirdwebProvider } from "thirdweb/react";
import { embeddedWallet, inAppWallet } from "thirdweb/wallets";

// You can add more wallets here if your SDK version supports them
// e.g., coinbaseWallet, metamaskWallet, etc. (check your SDK docs)

export default function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      // Add supported wallets to this array
      wallets={[
        embeddedWallet(),
        inAppWallet(),
        // Add more wallets here if needed and supported
      ]}
      // You can add other props here if needed, such as activeChain, supportedChains, etc.
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
